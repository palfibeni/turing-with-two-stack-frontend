import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./components/main.component";
import {CalculationComponent} from "./components/calculation/calculation.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'calculation',
        component: CalculationComponent,

    },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRouting {
}