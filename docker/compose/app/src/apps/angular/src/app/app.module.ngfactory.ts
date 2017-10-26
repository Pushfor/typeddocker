// little cheat
import { Injector, NgModuleFactory, NgModuleRef, Type } from "@angular/core";
import { AppModule } from "./app.module";
export class AppModuleNgFactoryClass extends NgModuleFactory<AppModule> {
    public get moduleType(): Type<AppModule> {
        return null;
    }
    public create(parentInjector: Injector | null): NgModuleRef<AppModule> {
        return null;
    }
}
export const AppModuleNgFactory = new AppModuleNgFactoryClass();
