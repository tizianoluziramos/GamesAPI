function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function escapeXMLVanilla(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export function loreToXml(
  lang: string,
  loreLang: {
    titulo: string;
    secciones: { id: number; titulo: string; contenido: string }[];
  }
) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<lore language="${lang}">\n`;
  xml += `  <titulo>${escapeXml(loreLang.titulo)}</titulo>\n`;
  xml += `  <secciones>\n`;
  loreLang.secciones.forEach((seccion) => {
    xml += `    <seccion id="${seccion.id}">\n`;
    xml += `      <titulo>${escapeXml(seccion.titulo)}</titulo>\n`;
    xml += `      <contenido>${escapeXml(seccion.contenido)}</contenido>\n`;
    xml += `    </seccion>\n`;
  });
  xml += `  </secciones>\n</lore>`;
  return xml;
}
