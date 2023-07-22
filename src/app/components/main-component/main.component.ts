import {Component, inject} from '@angular/core';
import {AngularFirestore, DocumentData} from "@angular/fire/compat/firestore";
import {Observable, of} from "rxjs";


class Experience {
    date : string = '';
    companyName : string = '';
    designation : string = '';
    description : string = '';
}

export class  BasicInfo {
    name = 'Bodrul Amin';
    address = 'Kalyanpur, Dhaka' ;
    cityName = 'Dhaka' ;
    profession = 'Software Engineer';
    dateOfBirth = 'October 25, 1994';
    zipCode = '1207';
    email = 'bodrulaminiu@gmail.com';
    phone = '+880-1725717136';
    photoUrl = '';
    photoUrl2 = '';
    cvUrl = '';
    githubUrl = '';
    summary = '';
    hireMeLink = '';
    myWorksLink = '';
    aboutMe = '';
    experiences: Experience[] | undefined;

}


@Component({
    selector: 'app-main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent {

    loaded = false;

    basicInfo: BasicInfo = new BasicInfo();
     experiences: Experience[] | undefined;
    constructor(private store: AngularFirestore) {}

    ngOnInit() {
        this.basicInfo = new BasicInfo();
        this.loadMyInfo();
    }

    public loadJsFile(url: string) {
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

     loadMyInfo(){
        let doc = this.store.firestore.collection('bodrulamin').doc('basicInfo');
        doc.get().then(a => {
            this.setData(a.data());
        })

         this.loadJsFile("assets/js/main.js");

        // doc.set(JSON.parse(JSON.stringify(this.basicInfo)));
    }

    private setData(data: any) {
        this.basicInfo = data;
        this.experiences = data.experiences;
        this.loaded = true;
    }
}
