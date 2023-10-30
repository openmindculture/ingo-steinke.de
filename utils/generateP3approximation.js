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
    let redPart   = parseInt('0x' + hexColor.substring(0,2));
    let greenPart = parseInt('0x' + hexColor.substring(0,2));
    let BluePart  = parseInt('0x' + hexColor.substring(0,2));
    let propertyPart =  (definitionParts[0].split(':'))[0];
    colorDefinition = 'color(display-p3';
    colorDefinition += ' ' + (redPart / 2.55).toFixed(2);
    colorDefinition += ' ' + (greenPart / 2.55).toFixed(2);
    colorDefinition += ' ' + (BluePart / 2.55).toFixed(2);
    colorDefinition += ')';
    output += propertyPart;
    if (propertyPart.startsWith('--')) {
      output += '-neon';
    }
    output += ': ' + colorDefinition + ';\n';
  });
  textareaOutput.value = output;
}
