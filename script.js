// Get references to DOM elements
const checkContrastButton = document.getElementById('checkContrast');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const resultElement = document.getElementById('result');
const textSample = document.getElementById('textSample');
const backgroundSample = document.getElementById('backgroundSample');

// Add event listener to the Check Contrast button
checkContrastButton.addEventListener('click', () => {
    const color1 = color1Input.value;
    const color2 = color2Input.value;

    // Calculate contrast ratio
    const contrastRatio = calculateContrastRatio(color1, color2);

    // Check if the contrast ratio meets accessibility standards
    const isAccessible = contrastRatio >= 4.5;

    if (isAccessible) {
        resultElement.textContent = `Contrast Ratio: ${contrastRatio.toFixed(2)} (Passes AA Standard)`;
    } else {
        resultElement.textContent = `Contrast Ratio: ${contrastRatio.toFixed(2)} (Fails AA Standard)`;
    }
});

// Function to calculate contrast ratio
function calculateContrastRatio(color1, color2) {
    // Calculate the relative luminance for the colors
    const luminance1 = calculateRelativeLuminance(color1);
    const luminance2 = calculateRelativeLuminance(color2);

    // Calculate the contrast ratio
    const ratio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);

    return ratio;
}

// Function to calculate relative luminance
function calculateRelativeLuminance(color) {
    const [r, g, b] = hexToRGB(color);
    const gammaCorrectedRGB = [sRGBToLinearRGB(r), sRGBToLinearRGB(g), sRGBToLinearRGB(b)];
    return 0.2126 * gammaCorrectedRGB[0] + 0.7152 * gammaCorrectedRGB[1] + 0.0722 * gammaCorrectedRGB[2];
}

// Function to convert sRGB to linear RGB
function sRGBToLinearRGB(value) {
    value = value / 255;
    if (value <= 0.04045) {
        return value / 12.92;
    } else {
        return Math.pow((value + 0.055) / 1.055, 2.4);
    }
}

// Function to convert hex color to RGB
function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

// Function to update the live color samples
function updateColorSamples(textColor, bgColor) {
    textSample.style.color = textColor;
    backgroundSample.style.backgroundColor = bgColor;
}

// Add event listeners to update the samples when colors change
color1Input.addEventListener('input', () => {
    const color1 = color1Input.value;
    updateColorSamples(color1, color2Input.value);
});

color2Input.addEventListener('input', () => {
    const color2 = color2Input.value;
    updateColorSamples(color1Input.value, color2);
});
