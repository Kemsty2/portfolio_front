class Membre {
  constructor(
    Id,
    Nom,
    Type,
    ProjectId,
    CreatedBy,
    UpdateBy,
    CreateAt,
    UpdateAt,
    Projet
  ) {
    this.Id = Id;
    this.Nom = Nom;
    this.Type = Type;
    this.ProjectId = ProjectId;
    this.CreateAt = CreateAt;
    this.CreatedBy = CreatedBy;
    this.UpdateAt = UpdateAt;
    this.UpdateBy = UpdateBy;
    this.Projet = Projet;
  }
}
