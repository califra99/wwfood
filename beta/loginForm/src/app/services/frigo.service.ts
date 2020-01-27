import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Frigo } from '../../models/frigo';

@Injectable({
	providedIn: 'root'
})
export class FrigoService {

	private frigos: Observable<Frigo[]>;
	private frigoCollection: AngularFirestoreCollection<Frigo>;

    constructor(private afs: AngularFirestore) {
        this.frigoCollection = this.afs.collection<Frigo>('frigos');

		this.frigos = this.frigoCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
    }

	getFrigos(): Observable<Frigo[]> {
		return this.frigos;
	}

	addFrigo(frigo: any): Promise<DocumentReference> {
		return this.frigoCollection.add(frigo);
	}

	updateFrigo(frigo: Frigo): Promise<void> {
		return this.frigoCollection.doc(frigo.id).update({ title: frigo.title });
	}


	deleteFrigo(id: string): Promise<void> {
		return this.frigoCollection.doc(id).delete();
    }

}