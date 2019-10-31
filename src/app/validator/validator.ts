import {Injectable} from "@angular/core";
import {_} from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class Validator {

    protected findDuplicates(array: Array<any>, predicateGenerator: Function = this.defaultPredicateGenerator()): Set<any> {
        let duplicates: Set<any> = new Set();
        for (let index  in array) {
            let element = array[index];
            let lastIndex = _.findLastIndex(array, predicateGenerator(element));
            if (lastIndex != index) {
                duplicates.add(element);
            }
        }
        return duplicates;
    }

    private defaultPredicateGenerator() {
        return element => {
            return other => element === other
        };
    }

}
