class CustomDropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('[data-dropdown-trigger]');
    this.options = element.querySelector('[data-dropdown-options]');
    this.valueDisplay = element.querySelector('[data-dropdown-value]');
    this.hiddenInput = element.querySelector('[data-dropdown-input]');
    this.optionItems = element.querySelectorAll('[data-dropdown-option]');
    this.isOpen = false;

    this.init();
  }

  init() {
    // Toggle dropdown on trigger click
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Select option on click
    this.optionItems.forEach(option => {
      option.addEventListener('click', (e) => {
        this.selectOption(e.currentTarget);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target) && this.isOpen) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.dropdown.classList.add('is-open');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.options.style.display = 'block';
  }

  close() {
    this.isOpen = false;
    this.dropdown.classList.remove('is-open');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.options.style.display = 'none';
  }

  selectOption(optionElement) {
    const value = optionElement.dataset.value;
    const optionPosition = optionElement.dataset.optionPosition;

    // Update UI
    this.valueDisplay.textContent = optionElement.textContent.trim();

    // Update hidden input
    this.hiddenInput.value = value;

    // Update active state
    this.optionItems.forEach(opt => {
      opt.classList.remove('active');
      opt.setAttribute('aria-selected', 'false');
    });
    optionElement.classList.add('active');
    optionElement.setAttribute('aria-selected', 'true');

    // Trigger change event for Shopify variant update
    const changeEvent = new Event('change', { bubbles: true });
    this.hiddenInput.dispatchEvent(changeEvent);

    // Manually trigger variant selection
    this.updateVariant(value, optionPosition);

    // Close dropdown
    this.close();
  }

  updateVariant(value, optionPosition) {
    try {
      // Find the variant picker element
      const variantPicker = this.dropdown.closest('[data-variant-picker]');
      if (!variantPicker) {
        console.warn('Variant picker not found');
        return;
      }

      // Get product variants from the JSON script
      const variantsScript = document.getElementById('productVariants');
      if (!variantsScript) {
        console.warn('Product variants script not found');
        return;
      }

      let variants;
      try {
        variants = JSON.parse(variantsScript.textContent);
      } catch (e) {
        console.error('Failed to parse product variants:', e);
        return;
      }

      // Get current selections from all dropdowns and other option selectors
      const allDropdowns = variantPicker.querySelectorAll('[data-dropdown-input]');
      const allRadios = variantPicker.querySelectorAll('input[type="radio"]:checked');
      const allSelects = variantPicker.querySelectorAll('select');

      // Build array of selected values [option1, option2, option3]
      const selectedValues = [];

      // Collect all option values in order
      const allInputs = [...allDropdowns, ...allRadios, ...allSelects];
      allInputs.forEach(input => {
        const position = input.dataset.optionPosition || this.getOptionPositionFromName(input.name);
        if (position) {
          const index = parseInt(position) - 1;
          selectedValues[index] = input.value;
          console.log(`Option ${index + 1} (position ${position}):`, input.value, input);
        }
      });

      console.log('Selected values:', selectedValues);
      console.log('Available variants:', variants);

      // Find matching variant by comparing options array
      // We need an exact match for all defined options
      const matchingVariant = variants.find(variant => {
        // Check if all selected values match this variant's options
        const matches = selectedValues.every((selectedValue, index) => {
          if (!selectedValue) return true; // Skip if no value selected for this position
          return variant.options[index] === selectedValue;
        });

        if (matches) {
          console.log('Found matching variant:', variant);
        }

        return matches;
      });

      if (matchingVariant) {
        console.log('Updating to variant:', matchingVariant.id, matchingVariant);
        this.updatePrice(matchingVariant);
        this.updateURL(matchingVariant);
      } else {
        console.warn('No matching variant found for selection:', selectedValues);
        console.warn('Available variants:', variants.map(v => ({ id: v.id, options: v.options })));
      }
    } catch (error) {
      console.error('Error in updateVariant:', error);
    }
  }

  getOptionPositionFromName(name) {
    // Extract option position from input name like "options[Prescription]"
    // We need to find which position this option is in the product options
    if (!name || !name.includes('options[')) return null;

    const variantPicker = this.dropdown.closest('[data-variant-picker]');
    if (!variantPicker) return null;

    const match = name.match(/options\[(.*?)\]/);
    if (!match) return null;

    const optionName = match[1];
    const optionElements = variantPicker.querySelectorAll('[data-option-name]');

    for (let i = 0; i < optionElements.length; i++) {
      if (optionElements[i].dataset.optionName === optionName) {
        return (i + 1).toString();
      }
    }

    return null;
  }

  updatePrice(variant) {
    if (!variant) return;

    // Update price display - look for the main product price element
    const priceElement = document.querySelector('.gsp-main-product-block-price .gsp-product-price');
    if (!priceElement) {
      console.warn('Price element not found');
      return;
    }

    const price = variant.price;
    const compareAtPrice = variant.compare_at_price || 0;

    // Format prices
    const formattedPrice = this.formatMoney(price);
    const formattedComparePrice = this.formatMoney(compareAtPrice);

    // Find the inner price container
    const priceContainer = priceElement.querySelector('.gsp-product__price-sale, .gsp-product__price-regular');

    // Update the price display
    if (compareAtPrice > price) {
      const newHTML = `
        <div class="gsp-product__price-sale">
          <span class="gsp-price-item-regular gsp-price-compare-at-price text-decoration-line-through fw-heading">
            ${formattedComparePrice}
          </span>
          <span class="gsp-price-item-sale price-item-last fw-semibold">
            ${formattedPrice}
          </span>
        </div>
      `;

      if (priceContainer) {
        priceContainer.outerHTML = newHTML;
      } else {
        priceElement.innerHTML = newHTML;
      }

      priceElement.classList.add('gsp-price-on-sale');
    } else {
      const newHTML = `
        <div class="gsp-product__price-regular">
          <span class="gsp-price-item-regular fw-semibold">
            ${formattedPrice}
          </span>
        </div>
      `;

      if (priceContainer) {
        priceContainer.outerHTML = newHTML;
      } else {
        priceElement.innerHTML = newHTML;
      }

      priceElement.classList.remove('gsp-price-on-sale');
    }

    // Update installment form if it exists
    const installmentInput = document.querySelector('#product-form-installment input[name="id"]');
    if (installmentInput) {
      installmentInput.value = variant.id;
    }

    // Update the main product form variant ID - CRITICAL for cart submission
    const productForm = document.querySelector('form[data-type="add-to-cart-form"]') ||
                       document.querySelector('form[action*="/cart/add"]');

    if (productForm) {
      let variantInput = productForm.querySelector('input[name="id"]');

      if (!variantInput) {
        console.error('Variant input not found in form, creating one');
        variantInput = document.createElement('input');
        variantInput.type = 'hidden';
        variantInput.name = 'id';
        variantInput.required = true;
        productForm.appendChild(variantInput);
      }

      // Update variant ID
      variantInput.value = variant.id;

      // Also update the data attribute for tracking
      variantInput.setAttribute('data-selected-variant', variant.id);

      console.log('Updated variant ID to:', variant.id, 'for variant:', variant);
    } else {
      console.error('Product form not found');
    }

    // Update Add to Cart button state based on variant availability
    this.updateAddToCartButton(variant);

    // Trigger a custom event that other scripts can listen to
    document.dispatchEvent(new CustomEvent('variant:change', {
      detail: { variant: variant }
    }));
  }

  updateAddToCartButton(variant) {
    const addToCartButton = document.querySelector('.gsp-product-actions-button[type="submit"]');
    if (!addToCartButton) return;

    const buttonContent = addToCartButton.querySelector('.gsp-button__content');

    if (variant.available) {
      // Enable button
      addToCartButton.disabled = false;
      addToCartButton.removeAttribute('disabled');

      // Update button text
      if (buttonContent) {
        buttonContent.textContent = window.gspString?.addToCart || 'Add to cart';
      }
    } else {
      // Disable button
      addToCartButton.disabled = true;
      addToCartButton.setAttribute('disabled', 'disabled');

      // Update button text to "Sold out"
      if (buttonContent) {
        buttonContent.textContent = window.gspString?.soldOut || 'Sold out';
      }
    }
  }

  formatMoney(cents) {
    // Use Shopify's formatMoney if available
    if (typeof Shopify !== 'undefined' && Shopify.formatMoney) {
      const format = window.gspSetting?.money_format || '${{amount}}';
      return Shopify.formatMoney(cents, format);
    }

    // Fallback formatter
    const dollars = (cents / 100).toFixed(2);
    return `$${dollars}`;
  }

  updateURL(variant) {
    // Update URL without page reload
    if (!variant) return;
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  }
}

// Initialize all custom dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(dropdown => {
    new CustomDropdown(dropdown);
  });
});
