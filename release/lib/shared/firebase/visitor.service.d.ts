import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
export interface Document {
    key?: string;
    id?: string;
}
export declare class VisitorService {
    afs: AngularFirestore;
    collectionRef: AngularFirestoreCollection<DocumentReference>;
    documents$: Observable<DocumentChangeAction<any>[]>;
    document$: Observable<Document>;
    query$: BehaviorSubject<any | null>;
    filters$: BehaviorSubject<any[] | null>;
    limit$: BehaviorSubject<number | null>;
    startAt$: BehaviorSubject<string | null>;
    startAfter$: BehaviorSubject<string | null>;
    orderBy$: BehaviorSubject<any | null>;
    endAt$: BehaviorSubject<string | null>;
    endBefore$: BehaviorSubject<string | null>;
    query: CollectionReference | Query;
    table: string;
    constructor(afs: AngularFirestore, table: string);
    createQuery(filters: any, limit: any, orderBy: any, query: any): void;
    initializeBehaviour(table: string): void;
    /**
     * get multiple documents
     * @return Observable
     */
    getDocuments(): Observable<any[]>;
    /**
     * get snapshot change with state, from action
     */
    private getDocPayload;
    /**
     * get a single document
     */
    getDocument(key: null | string): Observable<Document>;
    /**
     * Update a document
     */
    updateDocument(document: Document): Promise<void>;
    /**
     * create a Document
     */
    createDocument(document: any): Promise<DocumentReference>;
    /**
     * Delete a document
     */
    deleteDocument(document: Document): Promise<void>;
}
