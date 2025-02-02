- [ ] APP & DOMAIN - Implementer use case et domain, event, projection, repository du sous domaine maintenance
- [x] APP - Améliorer les projections pour savoir a quel event il s'est arrêté pour reprendre en cas d'arret
- [ ] INFRA EXPRESS - Implementer les controllers des sous domaines
  - [ ] register les routes pour les controllers
  - [ ] Implementer les requests pour les controllers
  - [] Créer les controllers et utiliser les use case (prefix les useCase par createUSECASE())
- [X] INFRA NEXT - setup une app next js (front et back)
- [ ] INFRA Vue - setup une app vue js qui utilise l'api Express
- [X] INFRA InMemory - Implementer les repository inMemory
- [X] Améliorer les logiques métiers pour ne pas pouvoir faire des actions selon le state actuel (ajouter tock a un truc inedu sxistant, supprimer deux fois un dealer etc.)
- [X] Améliorer la gestion des erreurs faire en sorte que Result.FailureStr retourne une ApplicationError dans tous les cas,
      sinon gérer identifiant = internalError dans repo, usecase, et les utiliser dans les controllers pour personaliser l'erreurs,
      ainsi que dans les projections pour gerer les cas limite (delete un mec deja delete = OK en projection)
- [ ] TEST - Implementer les tests pour les use case et les repositories (si temps restant)
- [X] Exception - Peut ajouter des property pour savoir si c'est du not found dans le domaine 
- [ ] Driver - empêcher de créer un driver avec un licenseId déjà existant et un email déjà existant

- [x] rename DealerAddress en Address
- [x] rename getQuery en getCollection des abstractMongo
- [] supprimer le dossier backend et tous mettre a la racine
