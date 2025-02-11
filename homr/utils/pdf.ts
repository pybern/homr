// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse";

// export async function getPdfContentFromUrl(url: string): Promise<string> {
//   const response = await fetch(url);
//   console.log(response)
//   const arrayBuffer = await response.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   const data = await pdf(buffer);
//   return data.text;
// }

export async function getPdfContentFromUrl(url : string) : Promise<string> {

  try {
    const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Get the PDF file as an ArrayBuffer
  const arrayBuffer = await response.arrayBuffer();
  
  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);

  console.log('Buffer', buffer)
  console.log('PDF fetched successfully. Parsing...');


    // Parse the PDF file
    const data = await pdf(buffer);
    console.log(data.text.length)
    console.log('PDF parsed successfully. Returning text content...');
    return data.text;
  }
  catch(error) {
    console.error(error);
    return ''
  }
}

// export async function getPdfContentFromUrl(url: string) {
//   console.log('url', url)
//   const response = await fetch(url);
//   console.log('response', response)
 
// }