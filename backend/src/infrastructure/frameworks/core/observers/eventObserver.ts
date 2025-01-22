import {EventObserver} from "../../../common/observers/EventObserver";

/**
 * Nécessaire pour le framework Next JS en raison de la gestion des Server Actions,
 * Pendant une server Action, l'EventObserver est instancié de nouveau pour une raison étrange, les listeners sont perdus
 * Mais l'identifiant de processus (PID) semble être le même, donc nous utilisons une variable globale pour garder la même instance
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
if(!globalThis.eventObserver){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    globalThis.eventObserver = new EventObserver()
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export const eventObserver : EventObserver = globalThis.eventObserver