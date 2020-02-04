class User {
  constructor(
    Id,
    Objet,
    StatutId,
    ChefProjetId,
    Type,
    Perimetre,
    Objectifs,
    ClientType,
    BeneficeClient,
    PourcentageCompletion,
    DateDebut,
    DateFinPrevue,
    DateFinReele,
    CreatedAt,
    CreatedBy,
    UpdateBy,
    UpdateAt,
    Equipe,
    Taches,
    JalonDates,
    Events
  ) {
    this.Id = Id;
    this.Objet = Objet;
    this.StatutId = StatutId;
    this.ChefProjetId = ChefProjetId;
    this.Type = Type;
    this.Perimetre = Perimetre;
    this.Objectifs = Objectifs;
    this.ClientType = ClientType;
    this.BeneficeClient = BeneficeClient;
    this.PourcentageCompletion = PourcentageCompletion;
    this.DateDebut = DateDebut;
    this.DateFinPrevue = DateFinPrevue;
    this.DateFinReele = DateFinReele;
    this.CreatedAt = CreatedAt;
    this.CreatedBy = CreatedBy;
    this.UpdateAt = UpdateAt;
    this.UpdateBy = UpdateBy;
    this.Equipe = Equipe;
    this.Taches = Taches;
    this.JalonDates = JalonDates;
    this.Events = Events;
  }
}
