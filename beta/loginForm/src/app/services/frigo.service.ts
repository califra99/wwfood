import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Frigo } from '../../models/frigo';

@Injectable({
	providedIn: 'root'
})
export class FrigoService {

	private frigos: Observable<Frigo[]>;
	private frigoCollection: AngularFirestoreCollection<Frigo>;

    constructor(
		private afs: AngularFirestore
		) {
	}
	
	initCollection() {
		console.log('recupera prodotti frigo utente', firebase.auth().currentUser.uid);

		this.frigoCollection = this.afs.collection<Frigo>('frigos-' + firebase.auth().currentUser.uid );

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
		this.initCollection();
		return this.frigos;
	}

	addFrigo(frigo: any): Promise<any> {
		return this.frigoCollection.add(frigo);
	}

	updateFrigo(frigo: Frigo): Promise<void> {
		return this.frigoCollection.doc(frigo.id).update({ title: frigo.title });
	}

	deleteFrigo(id: string): Promise<void> {
		return this.frigoCollection.doc(id).delete();
    }

}