import { FirebaseApp } from "firebase/app";
import { FirebaseStorage, StorageReference } from "firebase/storage";
import { Express } from 'express'

export interface IFirebaseService {
    firebaseApp: FirebaseApp
    firebaseStorage: FirebaseStorage

    uploadImage(filename: string, folder: string, file: Express.Multer.File): Promise<void>;
}