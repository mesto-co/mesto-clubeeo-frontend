export interface IUploadImageResponse {
  file: {
    name: string
    path: string
    uid: string
    ext: string
    index: number
  }
}

export const imgUploaded = (cb: (path: string) => unknown) => {
  return (info: {xhr: {response: string}}) => {
    const data = JSON.parse(info.xhr.response) as IUploadImageResponse;
    cb(data.file.path);
  }
}
