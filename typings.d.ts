interface Message {
    text: string,
    createdAt: admin.firestore.serverTimestamp,
    imageUrl: string,
    user: {
        _id: string,
        name: string,
        avatar: string,
    };
}

interface UrlList {
    prompt: string,
    createdAt: admin.firestore.serverTimestamp,
    urlObjList: { description: string; urls: string[]; }[] = [],
    user: {
        _id: string,
        name: string,
        avatar: string,
    },
}

interface base64 {
    prompt: string,
    createdAt: admin.firestore.serverTimestamp,
    base64Image: string,
    user: {
        _id: string,
        name: string,
        avatar: string,
    },
}

interface  Data {
    answer: string
}