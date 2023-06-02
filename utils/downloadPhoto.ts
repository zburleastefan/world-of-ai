import axios from "axios";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function appendNewToName(name: string) {
  let insertPos = name.indexOf(".");
  let newName = name
    .substring(0, insertPos)
    .concat("generated_image ", name.substring(insertPos));
  return newName;
}

export default async function downloadPhoto(url: string, filename: string) {
  await fetch(url, {
    headers: new Headers({
      Origin: location.origin,
            Accept: "*/*",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
          }),
    mode: "cors",
    method: "GET"
  })
  .then((response) => response.blob())
  .then((blob) => {
    const newFileName = appendNewToName(filename);
    let blobUrl = window.URL.createObjectURL(blob);
    forceDownload(blobUrl, newFileName);
  })
  .catch((e) => console.error(e));
  
  // export default function downloadPhoto(url: string, filename: string) {
  //   axios({
  //     url,
  //     method: 'GET',
  //     responseType: 'blob', // important
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', filename +'.png');
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // }
  
  // export default async function downloadPhoto(url: string, filename: string) {
  //   await NextCors(url, {
  //     headers: new Headers({
  //       Origin: location.origin,
  //     }),
  //     mode: "cors",
  //   })
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     const newFileName = appendNewToName(filename);
  //     let blobUrl = window.URL.createObjectURL(blob);
  //     forceDownload(blobUrl, newFileName);
  //   })
  //   .catch((e) => console.error(e));
  // }
}