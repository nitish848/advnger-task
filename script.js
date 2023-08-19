const colorpick = document.getElementById('colorpick');
const colorPalattesDiv = document.getElementById('color-palettes');
var selectedColor = 0
colorpick.addEventListener('input', (event) => {

    selectedColor = event.target.value;

    function hexToRGB(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 6), 16);
        return { r, g, b };
    }

    function rgbToHex(rgb) {
        return `#${(1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1)}`;
    }


    function generateComp(hexColor) {
        const rgbColor = hexToRGB(hexColor);
        const complementoryRGB = {
            r: 255 - rgbColor.r,
            g: 255 - rgbColor.g,
            b: 255 - rgbColor.b,
        };
        return rgbToHex(complementoryRGB);
    }

    function generateAnalogous(hexColor) {
        const rgbColor = hexToRGB(hexColor);
        const hueOffset = 30;
        const analogousColors = [];
        for (let i = -2; i <= 2; i++) {
            const hue = (rgbColor.r + i * hueOffset) % 360;
            analogousColors.push(rgbToHex({ r: hue, g: rgbColor.g, b: rgbColor.b }));
        }
        return analogousColors;
    }

    function generateTriadic(hexColor) {
        const rgbColor = hexToRGB(hexColor)
        const triadicColors = [];
        for (let i = 0; i < 3; i++) {
            const hue = (rgbColor.r + i * 120) % 360;
            triadicColors.push(rgbToHex({ r: hue, g: rgbColor.g, b: rgbColor.b }));
        }
        return triadicColors;
    }
    const complementoryColor = generateComp(selectedColor)
    const AnalogousColor = generateAnalogous(selectedColor)
    const TriadicColor = generateTriadic(selectedColor)
    function createPalatte(colors) {
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'color-palatte';

        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            paletteDiv.appendChild(colorBox);
            colorBox.addEventListener('click', () => {
                copyToClipboard(color);
                alert(`copied color: ${color}`)
            })
        });
        return paletteDiv;
    }

    colorPalattesDiv.appendChild(createPalatte([selectedColor, complementoryColor]))
    colorPalattesDiv.appendChild(createPalatte(AnalogousColor))
    colorPalattesDiv.appendChild(createPalatte(TriadicColor))

    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput)
    }
})
