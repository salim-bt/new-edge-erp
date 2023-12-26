const appendSSOAPIUrl = (path: string) => {
    const accessMethod = 'http://';
    const domainORIp = 'localhost';
    const port = '3000';
    const apiPath = '/api';
    const apiVersion = '/v1';
    const api = `${accessMethod}${domainORIp}:${port}${apiPath}${apiVersion}`;

    return `${api}${path}`;
}

export {appendSSOAPIUrl}

