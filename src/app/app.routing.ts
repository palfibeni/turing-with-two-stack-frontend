import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TuringMachineListComponent} from "./components/turing-machine-list/turing-machine-list.component";
import {TuringMachineComponent} from "./components/turing-machine/turing-machine.component";
import {CalculationComponent} from "./components/calculation/calculation.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    {
        path: 'turing-machine-list',
        component: TuringMachineListComponent,
    },
    {
        path: 'turing-machine',
        component: TuringMachineComponent,
    },
    {
        path: 'turing-machine/:entityId',
        component: TuringMachineComponent,
    },
    {
        path: 'calculation',
        component: CalculationComponent,

    },
    {
        path: '',
        redirectTo: '/turing-machine-list',
        pathMatch: 'full'
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRouting {
}
