using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Server.Models.University
{
    public partial class UniversityContext : DbContext
    {
        public UniversityContext(DbContextOptions<UniversityContext> options): base(options)
        { }

        public virtual DbSet<EducationForm> EducationForms { get; set; }
        public virtual DbSet<Placement> Placements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EducationForm>(entity =>
            {
                entity.ToTable("education_forms");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(50)");
            });

            modelBuilder.Entity<Placement>(entity =>
            {
                entity.ToTable("pg_header");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DocDate).HasColumnName("doc_date");

                entity.Property(e => e.DocDate2).HasColumnName("doc_date_2");

                entity.Property(e => e.EduFormId).HasColumnName("edu_form_id");

                entity.Property(e => e.EntraceYear).HasColumnName("entrace_year");

                entity.Property(e => e.PgKindId).HasColumnName("pg_kind_id");

                entity.Property(e => e.SpecialityId).HasColumnName("speciality_id");

                entity.HasOne(d => d.EduForm)
                    .WithMany(p => p.Placements)
                    .HasForeignKey(d => d.EduFormId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_pg_header_education_forms");
            });
        }
    }
}