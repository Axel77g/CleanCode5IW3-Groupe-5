1 - Repasser sur toutes les entity et rajouter la logique métier comme sur Order => Remplacer Error par ApplicationError sauf dans AbstractMongoRepository
2 - Modifier les repositories avec OptionalResult jamais de RESULT uniquement sur les méthodes find, getBy...
3 - Modifier les UseCase en conséquences => gérer .empty + utiliser les .create, .update, .delete & plus de sécurité (existance d'un objet...)
4 - Méthode pour créer les events sont dans les entities maintenant

!! CONTINUER A METTRE DES REGLES METIERS DANS LES ENTITIES COMME ORDER / VEHICULE ou STOCK !!

---

VehiculeWarranty (entities - garantie du véhicule) (value-object - Period)

- garantie du véhicule
- ... RECHECHER LES CONDITONS DE GARANTIES

---

SparePartWarranty (entities - garantie des pièces) (value-object - Period)

- garantie de la pièce détachée
- ... RECHECHER LES CONDITONS DE GARANTIES

---

Maintenance (value-object - MaintenanceInterval)

- Les entretiens à faire du véhicule sont définis par le Dealer
- Lié à un véhicule
- Créer un value-object CustomerMaintenanceHistory qui est un mélange de Customer, Maintenance & MaintenanceInterval
- Historique de maintenance du véhicule + liste des pièces détachées changées

---

MaintenanceInterval (value-object) + MaintenanceService (notification)
- par modèle de moto
- Les entretiens sont à faire tous les X (km, mois, années)
- property needNotification: boolean => CRON qui appelle un useCase qui regarde toutes les Maintenance qui ont un besoin d'entretien

---

MaintenanceService (notification) => Système de CRON

- Indiquer à un Driver qu'il doit faire un(des) entretien(s) sur son véhicule
