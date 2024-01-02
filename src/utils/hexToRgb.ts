export function hexToRgb(hex: string, opacity: number) {
  // Remove o caractere #, se presente
  hex = hex.replace(/^#/, '');

  // Converte para valores decimais
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Retorna como uma string no formato "rgb(r, g, b)"
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}
