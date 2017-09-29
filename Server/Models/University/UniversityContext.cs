using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Server.Models.University
{
    public class UniversityContext : DbContext
    {
        public UniversityContext(DbContextOptions<UniversityContext> options): base(options)
        { }        
        public virtual DbSet<EducationForm> EducationForms { get; set; }
        public virtual DbSet<JuridicalPerson> JuridicalPersons { get; set; }
        public virtual DbSet<Kladr> Kladr { get; set; }
        public virtual DbSet<PgContractInfo> PgContractInfos { get; set; }
        public virtual DbSet<PgContractStuff> PgContractStuffs { get; set; }
        public virtual DbSet<PgGraduateWorkplace> PgGraduateWorkplaces { get; set; }
        public virtual DbSet<PgHeader> PgHeaders { get; set; }
        public virtual DbSet<PgKind> PgKinds { get; set; }
        public virtual DbSet<PgType> PgTypes { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<Street> Streets { get; set; }
        public virtual DbSet<Country> Contries { get; set; }
        public virtual DbSet<Structure> Structures { get; set; }
        public virtual DbSet<Placement> Placements { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Speciality> Specialities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Speciality>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("speciality_id");
                entity.Property(e => e.Name).HasColumnName("speciality");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("v_pg_students");
                entity.Property(e => e.StudentId).HasColumnName("student_id");
                entity.Property(e => e.FullName).HasColumnName("full_name");
                entity.Property(e => e.RegAddress).HasColumnName("registration");
                entity.Property(e => e.FinanceId).HasColumnName("finance_id");
                entity.Property(e => e.Finance).HasColumnName("finance");
                entity.Property(e => e.EntrTypeId).HasColumnName("entr_type_id");
                entity.Property(e => e.EntrType).HasColumnName("entr_type");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.StateId).HasColumnName("state_id");
                entity.Property(e => e.State).HasColumnName("state");
                entity.Property(e => e.SpecialityId).HasColumnName("speciality_id");
                entity.Property(e => e.EducationFormId).HasColumnName("education_form_id");
                entity.Property(e => e.EntranceYear).HasColumnName("entrance_year");
            });

            modelBuilder.Entity<Placement>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.FacultyId).HasColumnName("faculty_id");
                entity.Property(e => e.Faculty).HasColumnName("faculty");
                entity.Property(e => e.SpecialityId).HasColumnName("speciality_id");
                entity.Property(e => e.Speciality).HasColumnName("speciality");
                entity.Property(e => e.EntranceYear).HasColumnName("entrace_year");
                entity.Property(e => e.EduFormId).HasColumnName("edu_form_id");
                entity.Property(e => e.EduForm).HasColumnName("edu_form");
            });

            modelBuilder.Entity<Structure>(entity =>
            {
                entity.ToTable("vStructure");
                entity.Property(e => e.AffiliateId).HasColumnName("affiliate_id");
                entity.Property(e => e.Affiliate)
                    .HasColumnName("affiliate")
                    .HasColumnType("varchar(50)");
                entity.Property(e => e.FacultyId).HasColumnName("faculty_id");
                entity.Property(e => e.Faculty)
                    .HasColumnName("faculty")
                    .HasColumnType("varchar(100)");
                entity.Property(e => e.SpecialityId).HasColumnName("speciality_id");
                entity.Property(e => e.Speciality)
                    .HasColumnName("speciality_full")
                    .HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<EducationForm>(entity =>
            {
                entity.ToTable("education_forms");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("countries");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(50)");
            });            

            modelBuilder.Entity<JuridicalPerson>(entity =>
            {
                entity.ToTable("juridical_persons");
                entity.Property(e => e.Id).HasColumnName("id");
                // entity.Property(e => e.AgreementDate)
                //     .HasColumnName("agreement_date")
                //     .HasColumnType("datetime");
                // entity.Property(e => e.Inn)
                //     .HasColumnName("INN")
                //     .HasColumnType("varchar(12)");
                // entity.Property(e => e.Kpp)
                //     .HasColumnName("KPP")
                //     .HasColumnType("varchar(10)");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(256)");
                // entity.Property(e => e.Person)
                //     .HasColumnName("person")
                //     .HasColumnType("varchar(max)");
                // entity.Property(e => e.PostCode)
                //     .HasColumnName("post_code")
                //     .HasColumnType("varchar(6)");
                entity.Property(e => e.RegistrationCase)
                    .HasColumnName("registration_case")
                    .HasColumnType("varchar(5)")
                    .HasDefaultValueSql("''");
                entity.Property(e => e.RegistrationCityId).HasColumnName("registration_city_id");
                entity.Property(e => e.RegistrationCountryId).HasColumnName("registration_country_id");
                entity.Property(e => e.RegistrationDistrictId).HasColumnName("registration_district_id");
                entity.Property(e => e.RegistrationFlat)
                    .HasColumnName("registration_flat")
                    .HasColumnType("varchar(5)")
                    .HasDefaultValueSql("''");
                entity.Property(e => e.RegistrationHouse)
                    .HasColumnName("registration_house")
                    .HasColumnType("varchar(5)")
                    .HasDefaultValueSql("''");
                entity.Property(e => e.RegistrationRegionId).HasColumnName("registration_region_id");
                entity.Property(e => e.RegistrationSettlementId).HasColumnName("registration_settlement_id");
                entity.Property(e => e.RegistrationStreetId).HasColumnName("registration_street_id");
                // entity.Property(e => e.SchoolId).HasColumnName("school_id");
                // entity.Property(e => e.ShortName)
                //     .HasColumnName("short_name")
                //     .HasColumnType("varchar(256)");
                // entity.Property(e => e.WorkPlaceTypeId).HasColumnName("work_place_type_id");
                entity.HasOne(d => d.RegistrationCity)
                    .WithMany(p => p.JuridicalPersonsRegistrationCity)
                    .HasForeignKey(d => d.RegistrationCityId)
                    .HasConstraintName("FK_juridical_persons_kladr2");
                entity.HasOne(d => d.RegistrationDistrict)
                    .WithMany(p => p.JuridicalPersonsRegistrationDistrict)
                    .HasForeignKey(d => d.RegistrationDistrictId)
                    .HasConstraintName("FK_juridical_persons_kladr1");
                entity.HasOne(d => d.RegistrationRegion)
                    .WithMany(p => p.JuridicalPersonsRegistrationRegion)
                    .HasForeignKey(d => d.RegistrationRegionId)
                    .HasConstraintName("FK_juridical_persons_kladr");
                entity.HasOne(d => d.RegistrationSettlement)
                    .WithMany(p => p.JuridicalPersonsRegistrationSettlement)
                    .HasForeignKey(d => d.RegistrationSettlementId)
                    .HasConstraintName("FK_juridical_persons_kladr3");
                entity.HasOne(d => d.RegistrationStreet)
                    .WithMany(p => p.JuridicalPersons)
                    .HasForeignKey(d => d.RegistrationStreetId)
                    .HasConstraintName("FK_juridical_persons_street");
                entity.HasOne(d => d.Country)
                    .WithMany(p => p.JuridicalPersons)
                    .HasForeignKey(d => d.RegistrationCountryId)
                    .HasConstraintName("FK_juridical_persons_countries");                    
            });

            modelBuilder.Entity<Kladr>(entity =>
            {
                entity.ToTable("kladr");
                entity.HasIndex(e => e.ElLevel)
                    .HasName("IX_kladr_1");
                entity.HasIndex(e => e.ParentId)
                    .HasName("IX_kladr");
                entity.HasIndex(e => new { e.Id, e.Name })
                    .HasName("_dta_index_kladr_5_85575343__K1_K4");
                entity.HasIndex(e => new { e.Socr, e.ElLevel, e.Id, e.Name })
                    .HasName("_dta_index_kladr_5_85575343__K1_K4_3_5");
                entity.HasIndex(e => new { e.Socr, e.ElLevel, e.ParentId, e.Id, e.Name })
                    .HasName("_dta_index_kladr_5_85575343__K2_K1_K4_3_5");
                entity.HasIndex(e => new { e.Socr, e.ElLevel, e.Code, e.ParentId, e.Id, e.Name })
                    .HasName("_dta_index_kladr_5_85575343__K2_K1_K4_3_5_6");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("CODE")
                    .HasMaxLength(13);
                entity.Property(e => e.ElLevel).HasColumnName("el_level");
                entity.Property(e => e.FomsId).HasColumnName("foms_id");
                entity.Property(e => e.Gninmb)
                    .HasColumnName("GNINMB")
                    .HasMaxLength(4);
                entity.Property(e => e.Index)
                    .HasColumnName("INDEX")
                    .HasMaxLength(6);
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(40);
                entity.Property(e => e.Ocatd)
                    .HasColumnName("OCATD")
                    .HasMaxLength(11);
                entity.Property(e => e.ParentId).HasColumnName("parent_id");
                entity.Property(e => e.Socr)
                    .IsRequired()
                    .HasColumnName("SOCR")
                    .HasMaxLength(10);
                entity.Property(e => e.Status)
                    .HasColumnName("STATUS")
                    .HasMaxLength(1);
                entity.Property(e => e.Uno)
                    .HasColumnName("UNO")
                    .HasMaxLength(4);
            });

            modelBuilder.Entity<PgContractInfo>(entity =>
            {
                entity.ToTable("pg_contract_info");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ContractBegin)
                    .HasColumnName("contract_begin")
                    .HasColumnType("datetime");
                entity.Property(e => e.ContractEnd)
                    .HasColumnName("contract_end")
                    .HasColumnType("datetime");
                entity.Property(e => e.IsexistContract)
                    .HasColumnName("isexist_contract")
                    .HasDefaultValueSql("0");
                entity.Property(e => e.JuridicalPersonId).HasColumnName("juridical_person_id");
                entity.Property(e => e.NumberContract)
                    .HasColumnName("number_contract")
                    .HasMaxLength(20);
                // entity.HasOne(d => d.JuridicalPerson)
                //     .WithMany(p => p.PgContractInfos)
                //     .HasForeignKey(d => d.JuridicalPersonId)
                //     .OnDelete(DeleteBehavior.Restrict)
                //     .HasConstraintName("FK_pg_contract_info_juridical_persons");
            });

            modelBuilder.Entity<PgContractStuff>(entity =>
            {
                entity.ToTable("pg_contract_stuff");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.DirectionTypeId).HasColumnName("distribution_type_id");
                entity.Property(e => e.DistributionTypeId).HasColumnName("distribution_type_id_2");
                entity.Property(e => e.JobOnSpeciality).HasColumnName("job_on_speciality");
                entity.Property(e => e.DirectionOrganizationId).HasColumnName("organization_id");
                entity.Property(e => e.DistributionOrganizationId).HasColumnName("organization_id_2");
                entity.Property(e => e.PgHeaderId).HasColumnName("pg_header_id");
                entity.Property(e => e.DirectionSchoolId).HasColumnName("school_id");
                entity.Property(e => e.DistributionSchoolId).HasColumnName("school_id_2");
                entity.Property(e => e.StudentId).HasColumnName("student_id");
                entity.HasOne(d => d.DirectionType)
                    .WithMany(p => p.DirectionContractStuffs)
                    .HasForeignKey(d => d.DirectionTypeId)
                    .HasConstraintName("FK_pg_contract_stuff_pg_types");
                entity.HasOne(d => d.DistributionType)
                    .WithMany(p => p.DistributionContractStuffs)
                    .HasForeignKey(d => d.DistributionTypeId)
                    .HasConstraintName("FK_pg_contract_stuff_pg_types1");
                entity.HasOne(d => d.DirectionOrganization)
                    .WithMany(p => p.DirectionContractStuffs)
                    .HasForeignKey(d => d.DirectionOrganizationId)
                    .HasConstraintName("FK_pg_contract_stuff_juridical_persons");
                entity.HasOne(d => d.DistributionOrganization)
                    .WithMany(p => p.DistributionContractStuffs)
                    .HasForeignKey(d => d.DistributionOrganizationId)
                    .HasConstraintName("FK_pg_contract_stuff_juridical_persons1");
                entity.HasOne(d => d.PgHeader)
                    .WithMany(p => p.PgContractStuffs)
                    .HasForeignKey(d => d.PgHeaderId)
                    .HasConstraintName("FK_pg_contract_stuff_pg_header");
                entity.HasOne(d => d.DirectionSchool)
                    .WithMany(p => p.DirectionContractStuffs)
                    .HasForeignKey(d => d.DirectionSchoolId)
                    .HasConstraintName("FK_pg_contract_stuff_schools");
                entity.HasOne(d => d.DistributionSchool)
                    .WithMany(p => p.DistributionContractStuffs)
                    .HasForeignKey(d => d.DistributionSchoolId)
                    .HasConstraintName("FK_pg_contract_stuff_schools1");
                entity.HasOne(d => d.Student)
                    .WithMany(p => p.ContractStuffs)
                    .HasForeignKey(d => d.StudentId);
            });

            modelBuilder.Entity<PgGraduateWorkplace>(entity =>
            {
                entity.ToTable("pg_graduate_workplace");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");
                entity.Property(e => e.JuridicalPersonId).HasColumnName("juridical_person_id");
                entity.Property(e => e.Post)
                    .HasColumnName("post")
                    .HasMaxLength(150);
                entity.Property(e => e.SchoolId).HasColumnName("school_id");
                entity.Property(e => e.StudentId).HasColumnName("student_id");
                // entity.HasOne(d => d.JuridicalPerson)
                //     .WithMany(p => p.PgGraduateWorkplaces)
                //     .HasForeignKey(d => d.JuridicalPersonId)
                //     .HasConstraintName("FK_pg_graduate_workplace_juridical_persons");
                // entity.HasOne(d => d.School)
                //     .WithMany(p => p.PgGraduateWorkplaces)
                //     .HasForeignKey(d => d.SchoolId)
                //     .HasConstraintName("FK_pg_graduate_workplace_schools");
            });

            modelBuilder.Entity<PgHeader>(entity =>
            {
                entity.ToTable("pg_header");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.DocDate).HasColumnName("doc_date");
                entity.Property(e => e.EduFormId).HasColumnName("edu_form_id");
                entity.Property(e => e.EntraceYear).HasColumnName("entrace_year");
                entity.Property(e => e.SpecialityId).HasColumnName("speciality_id");
                entity.HasOne(d => d.EduForm)
                    .WithMany(p => p.PgHeaders)
                    .HasForeignKey(d => d.EduFormId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_pg_header_education_forms");
            });

            modelBuilder.Entity<PgKind>(entity =>
            {
                entity.ToTable("pg_kinds");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PgType>(entity =>
            {
                entity.ToTable("pg_types");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(100);
                entity.Property(e => e.PgKindId).HasColumnName("pg_kind_id");
                entity.HasOne(d => d.PgKind)
                    .WithMany(p => p.PgTypes)
                    .HasForeignKey(d => d.PgKindId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_pg_types_pg_types");
            });

            modelBuilder.Entity<School>(entity =>
            {
                entity.ToTable("schools");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)");
                // entity.HasIndex(e => new { e.Name, e.Id })
                //     .HasName("_dta_index_schools_5_1083202959__K1_2");
                // entity.HasIndex(e => new { e.SchoolRegionId, e.Id })
                //     .HasName("_dta_index_schools_5_1083202959__K1_6");
                // entity.Property(e => e.CityDistrictId).HasColumnName("city_district_id");
                // entity.Property(e => e.InstId).HasColumnName("inst_id");
                // entity.Property(e => e.KindOu)
                //     .HasColumnName("kind_ou")
                //     .HasColumnType("char(4)");
                // entity.Property(e => e.SchoolCityId).HasColumnName("school_city_id");
                // entity.Property(e => e.SchoolCountryId).HasColumnName("school_country_id");
                // entity.Property(e => e.SchoolDistrictId).HasColumnName("school_district_id");
                // entity.Property(e => e.SchoolRegionId).HasColumnName("school_region_id");
                // entity.Property(e => e.SchoolSettlementId).HasColumnName("school_settlement_id");
                // entity.Property(e => e.ShortName)
                //     .HasColumnName("short_name")
                //     .HasColumnType("varchar(150)");
                // entity.Property(e => e.TypeId)
                //     .HasColumnName("type_id")
                //     .HasDefaultValueSql("14");
                // entity.HasOne(d => d.SchoolCity)
                //     .WithMany(p => p.SchoolsCity)
                //     .HasForeignKey(d => d.SchoolCityId)
                //     .HasConstraintName("FK_schools_kladr2");
                // entity.HasOne(d => d.SchoolDistrict)
                //     .WithMany(p => p.SchoolsDistrict)
                //     .HasForeignKey(d => d.SchoolDistrictId)
                //     .HasConstraintName("FK_schools_kladr1");
                // entity.HasOne(d => d.SchoolRegion)
                //     .WithMany(p => p.SchoolsRegion)
                //     .HasForeignKey(d => d.SchoolRegionId)
                //     .HasConstraintName("FK_schools_kladr");
                // entity.HasOne(d => d.SchoolSettlement)
                //     .WithMany(p => p.SchoolsSettlement)
                //     .HasForeignKey(d => d.SchoolSettlementId)
                //     .HasConstraintName("FK_schools_kladr3");
                // entity.HasOne(d => d.Country)
                //     .WithMany(p => p.Schools)
                //     .HasForeignKey(d => d.SchoolCountryId)
                //     .HasConstraintName("FK_schools_countries");                    
            });

            modelBuilder.Entity<Street>(entity =>
            {
                entity.ToTable("street");
                entity.HasIndex(e => e.KladrId)
                    .HasName("IX_street");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CityDistrictId).HasColumnName("city_district_id");
                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("CODE")
                    .HasMaxLength(17);
                entity.Property(e => e.Gninmb)
                    .HasColumnName("GNINMB")
                    .HasMaxLength(4);
                entity.Property(e => e.Index)
                    .HasColumnName("INDEX")
                    .HasMaxLength(6);
                entity.Property(e => e.KladrId).HasColumnName("kladr_id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NAME")
                    .HasMaxLength(40);
                entity.Property(e => e.Ocatd)
                    .HasColumnName("OCATD")
                    .HasMaxLength(11);
                entity.Property(e => e.Socr)
                    .IsRequired()
                    .HasColumnName("SOCR")
                    .HasMaxLength(10);
                entity.Property(e => e.Uno)
                    .HasColumnName("UNO")
                    .HasMaxLength(4);
                entity.HasOne(d => d.Kladr)
                    .WithMany(p => p.Streets)
                    .HasForeignKey(d => d.KladrId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_street_kladr");
            });
        }
    }
}