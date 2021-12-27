import { Column, Entity, Index } from "typeorm";

@Index("VerificationToken_identifier_token_key", ["identifier", "token"], {
  unique: true,
})
@Index("VerificationToken_token_key", ["token"], { unique: true })
@Entity("verificationtoken", { schema: "testing" })
export class Verificationtoken {
  @Column("varchar", { name: "identifier", length: 191 })
  identifier: string;

  @Column("varchar", { name: "token", length: 191 })
  token: string;

  @Column("datetime", { name: "expires" })
  expires: Date;
}
