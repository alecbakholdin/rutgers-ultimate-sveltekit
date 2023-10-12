import parse from 'parse-css-color'

/**
 * 
 * @param cssColor color as any css string
 * @returns black or white, depending on which one offers better contrast
 */
export function getContrast(cssColor?: string) {
    if(!cssColor) return 'black';
    const parsed = parse(cssColor);
    if(!parsed) return 'black';

    const [r, g, b] = parsed.values;

	// Get YIQ ratio
	var yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// Check contrast
	return yiq >= 128 ? 'black' : 'white';
}
