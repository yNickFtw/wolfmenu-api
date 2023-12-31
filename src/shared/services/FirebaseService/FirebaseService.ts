import { IFirebaseService } from './IFirebaseService'
import firebaseConfig from '../../config/firebase-config'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Express } from 'express'

export default class FirebaseService implements IFirebaseService {
    firebaseApp: FirebaseApp;
    firebaseStorage: FirebaseStorage;

    constructor(){
        this.firebaseApp = initializeApp(firebaseConfig);
        this.firebaseStorage = getStorage(this.firebaseApp);
    }

    public async uploadImage(filename: string, folder: string, file: Express.Multer.File): Promise<string> {
        const storageRef = ref(this.firebaseStorage, `${folder}/${filename}.png`);

        await uploadBytes(storageRef, file.buffer, {
            contentType: file.mimetype
        })
        
        const url = await getDownloadURL(storageRef)

        return url;
    }
}
