class Server {
  readonly host: string = import.meta.env.VITE_SERVICE_HOST


  endpoint(path: string) {
    // console.log(this.host);
    // console.log(this.host.slice(-1));
    if (this.host.slice(-1) !== "/") {
      return this.host + path
    }
    return `${this.host}/${path}`
  }
}

export const serverConfig = new Server()
