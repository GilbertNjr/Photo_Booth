export type PrintLayoutType = '2x6' | '4x6' | 'a4';

export class PrintService {
  /**
   * Print high-resolution image data URL with selected print layout
   */
  static printCanvas(imageDataUrl: string, layout: PrintLayoutType = '4x6'): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let layoutStyles = '';

    if (layout === '2x6') {
      layoutStyles = `
        @page { size: 2in 6in; margin: 0; }
        body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: white; }
        img { width: 100%; height: 100%; object-fit: contain; }
      `;
    } else if (layout === 'a4') {
      layoutStyles = `
        @page { size: A4; margin: 10mm; }
        body { margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; align-items: center; justify-content: center; background: white; }
        img { width: 100%; height: auto; object-fit: contain; }
      `;
    } else {
      // 4x6 Postcard default
      layoutStyles = `
        @page { size: 4in 6in; margin: 0; }
        body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: white; }
        img { width: 100%; height: 100%; object-fit: contain; }
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Photo Booth Print Studio</title>
          <style>
            ${layoutStyles}
          </style>
        </head>
        <body>
          <img src="${imageDataUrl}" />
          ${layout === 'a4' ? `<img src="${imageDataUrl}" />` : ''}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }
}
