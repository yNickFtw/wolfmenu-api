import { FirebaseApp } from "firebase/app";
import { FirebaseStorage } from "firebase/storage";

export interface IFirebaseService {
    firebaseApp: FirebaseApp
    firebaseStorage: FirebaseStorage

    uploadImage(filename: string, folder: string, file: Buffer, mimetype: string): Promise<string>;
}