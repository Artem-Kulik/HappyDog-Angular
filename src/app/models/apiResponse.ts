export class ApiResponse {
    isSuccessful: boolean = false;
    message: string = "";
}

export class ApiCollectionResponse extends ApiResponse{
    data: Array<any> = new Array<any>();
}

export class ApiSingleResponse extends ApiResponse{
    data: any;
}

export class ApiTokenResponse extends ApiResponse{
    token: string = "";
}