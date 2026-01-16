import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GeneralesService } from "../servicios/generales.service";
import { ComponentesPDFService } from "../servicios/componentes-pdf.service";

(pdfMake as any).vfs = pdfFonts.vfs;
let servicio = new ComponentesPDFService();

const generarPago = () => {
    const content: any[] = [];
    const tableBody = servicio.celdaUnCampo('blue', 'white', true, 10, 'Hola Mundo');
      
    content.push({
        table: {
          body: [
            [
              {
                table: {
                    body: tableBody,
                    widths: ["100%"],
                    fontSize: 10,
                }
              },
            ]
          ],
          widths: ["33.33%", "33.34%", "33.33%"]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 0],
    });
    const styles = {
        header: {
          fontSize: 14,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          margin: [0, 5, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "black",
        },
        total: {
          fontSize: 12,
          bold: true,
        },
    };


  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generarPago;