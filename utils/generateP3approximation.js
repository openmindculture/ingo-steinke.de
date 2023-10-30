const generateP3Approximation = function() {
  let output = '';
  let textareaInput = document.getElementById('colorsInput');
  let textareaOutput = document.getElementById('colorsOutput');
  let colorDefinitionsRGB = textareaInput.value.split(/\r?\n/);
  colorDefinitionsRGB.forEach((colorDefinition) => {
    output += colorDefinition + '\n';
    if (!colorDefinition.includes('#') || !colorDefinition.endsWith(';')) {
      return;
    }
    let definitionParts = colorDefinition.split('#');
    let hexColor  = definitionParts.pop();
    let redPart   = parseInt(hexColor.substring(0,2), 16);
    let greenPart = parseInt(hexColor.substring(2,4), 16);
    let bluePart  = parseInt(hexColor.substring(4,6), 16);
    let propertyPart =  (definitionParts[0].split(':'))[0];
    colorDefinition = 'color(display-p3';
    colorDefinition += ' ' + (redPart / 2.55).toFixed(2);
    colorDefinition += ' ' + (greenPart / 2.55).toFixed(2);
    colorDefinition += ' ' + (bluePart / 2.55).toFixed(2);
    colorDefinition += ')';
    output += propertyPart;
    if (propertyPart.startsWith('--')) {
      output += '-neon';
    }
    output += ': ' + colorDefinition + ';\n';
  });
  textareaOutput.value = output;
}
