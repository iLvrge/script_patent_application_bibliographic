const FamilyLegalCode = require("./models/FamilyLegalCode"); 
const connection = require("./config/index");
const legalCodeDescription = [
    {
        country_code: "AR",
        legal_code: "FA",
        description: "ABANDONMENT OR WITHDRAWAL"
    },
    {
        country_code: "AR",
        legal_code: "FB",
        description: "SUSPENSION OF GRANTING PROCEDURE"
    },
    {
        country_code: "AR",
        legal_code: "FC",
        description: "REFUSAL"
    },
    {
        country_code: "AR",
        legal_code: "FD",
        description: "APPLICATION DECLARED VOID OR LAPSED, E.G., DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "AR",
        legal_code: "FG",
        description: "GRANT; REGISTRATION"
    },
    {
        country_code: "AT",
        legal_code: "A1",
        description: "REVOCATION OF PUBLISHED EXAMINED APPLICATION"
    },
    {
        country_code: "AT",
        legal_code: "A1AW",
        description: "REVOCATION OF PUBLISHED EXAMINED APPLICATION"
    },
    {
        country_code: "AT",
        legal_code: "A1B",
        description: "CORRECTION"
    },
    {
        country_code: "AT",
        legal_code: "A1J",
        description: "WITHDRAWAL PARAGRAPH 166 LIT. 6"
    },
    {
        country_code: "AT",
        legal_code: "A1V",
        description: "REFUSAL"
    },
    {
        country_code: "AT",
        legal_code: "A1WE",
        description: "CONCESSION OF RESTITUTION"
    },
    {
        country_code: "AT",
        legal_code: "A1WR",
        description: "REVOCATION"
    },
    {
        country_code: "AT",
        legal_code: "A1Z",
        description: "WITHDRAWN"
    },
    {
        country_code: "AT",
        legal_code: "AAW",
        description: "REVOCATION OF PUBLISHED EXAMINED APPLICATION"
    },
    {
        country_code: "AT",
        legal_code: "AJI",
        description: "ERRONEOUS WITHDRAWAL"
    },
    {
        country_code: "AT",
        legal_code: "AWE",
        description: "CONCESSION OF RESTITUTION"
    },
    {
        country_code: "AT",
        legal_code: "AWR",
        description: "REVOCATION"
    },
    {
        country_code: "AT",
        legal_code: "AZ",
        description: "WITHDRAWN"
    },
    {
        country_code: "AT",
        legal_code: "BA",
        description: "NOTIFICATION SUSPENDED"
    },
    {
        country_code: "AT",
        legal_code: "EB",
        description: "CORRECTION OF GRANT"
    },
    {
        country_code: "AT",
        legal_code: "EBA",
        description: "NOTIFICATION SUSPENDED (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "EDES",
        description: "AT NOT NOMINATED AS A DESIGNATED STATE"
    },
    {
        country_code: "AT",
        legal_code: "EEB",
        description: "CORRECTION OF GRANT"
    },
    {
        country_code: "AT",
        legal_code: "EECC",
        description: "CORRECTIONS OF CLAIMS AS TO PAR. 4/2 APPEALED"
    },
    {
        country_code: "AT",
        legal_code: "EEFA",
        description: "CHANGE OF THE COMPANY NAME"
    },
    {
        country_code: "AT",
        legal_code: "EEGN",
        description: "DEEMED TO BE NOT GRANTED"
    },
    {
        country_code: "AT",
        legal_code: "EEIH",
        description: "CHANGE IN THE PERSON OF PATENT OWNER"
    },
    {
        country_code: "AT",
        legal_code: "EEK",
        description: "PROCLAMATION AS TO PARAGRAPH 128 PATENT LAW"
    },
    {
        country_code: "AT",
        legal_code: "EEK1",
        description: "PROCLAMATION AS TO PARAGRAPH 128 PATENT LAW"
    },
    {
        country_code: "AT",
        legal_code: "EELA",
        description: "CANCELLED DUE TO LAPSE OF TIME"
    },
    {
        country_code: "AT",
        legal_code: "EELB",
        description: "CORRECTION OF A CANCELLATION"
    },
    {
        country_code: "AT",
        legal_code: "EELI",
        description: "ERRONEOUS LAPS OF EP NUMBER"
    },
    {
        country_code: "AT",
        legal_code: "EELJ",
        description: "LAPSED DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "AT",
        legal_code: "EELV",
        description: "LAPSED DUE TO WITHDRAWAL"
    },
    {
        country_code: "AT",
        legal_code: "EEN",
        description: "DECLARATION OF NULLIFICATION"
    },
    {
        country_code: "AT",
        legal_code: "EENE",
        description: "NOMINATION OF INVENTOR"
    },
    {
        country_code: "AT",
        legal_code: "EEPA",
        description: "CORRECTION: FIRST CLAIM"
    },
    {
        country_code: "AT",
        legal_code: "EETN",
        description: "DECLARATION OF NULLIFICATION IN PART"
    },
    {
        country_code: "AT",
        legal_code: "EETR",
        description: "CORRECTION OF THE TRANSLATION AS TO PAR. 6/3 PATV-EG"
    },
    {
        country_code: "AT",
        legal_code: "EETV",
        description: "PARTIALLY WITHDRAWN"
    },
    {
        country_code: "AT",
        legal_code: "EEVS",
        description: "CORRECTION: LANGUAGE OF PUBLICATION"
    },
    {
        country_code: "AT",
        legal_code: "EEWE",
        description: "AUTHORIZATION FOR RESTITUTION"
    },
    {
        country_code: "AT",
        legal_code: "EEZF",
        description: "GRANT FOR A CERTIFICATE OF PROTECTION (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "EFA",
        description: "CHANGE IN THE COMPANY NAME"
    },
    {
        country_code: "AT",
        legal_code: "EGA",
        description: "DECISION OF GRANT WAS REVOKED"
    },
    {
        country_code: "AT",
        legal_code: "EGN",
        description: "DEEMED TO BE NOT GRANTED"
    },
    {
        country_code: "AT",
        legal_code: "EIH",
        description: "CHANGE IN THE PERSON OF PATENT OWNER"
    },
    {
        country_code: "AT",
        legal_code: "EK",
        description: "PROCLAMATION AS TO PARAGRAPH 128 PAT.LAW"
    },
    {
        country_code: "AT",
        legal_code: "ELA",
        description: "EXPIRED DUE TO LAPSE OF TIME"
    },
    {
        country_code: "AT",
        legal_code: "ELI",
        description: "ERRONEOUS LAPSE"
    },
    {
        country_code: "AT",
        legal_code: "ELJ",
        description: "CEASED DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "AT",
        legal_code: "ELV",
        description: "CEASED DUE TO RENUNCIATION"
    },
    {
        country_code: "AT",
        legal_code: "EN",
        description: "DECLARATION OF NULLIFICATION"
    },
    {
        country_code: "AT",
        legal_code: "ENE",
        description: "INVENTOR NAMED"
    },
    {
        country_code: "AT",
        legal_code: "EPS",
        description: "PROCESS SUSPENDED BEFORE GRANT OF PATENT"
    },
    {
        country_code: "AT",
        legal_code: "ESZA",
        description: "APPLICATION FILED FOR A CERTIFICATE OF PROTECTION (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "ESZL",
        description: "CERTIFICATE OF PROTECTION EXPIRED (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "ESZP",
        description: "APPLICATION FOR PROLONGATION OF SPC"
    },
    {
        country_code: "AT",
        legal_code: "ESZW",
        description: "CERTIFICATE OF PROTECTION REJECTED (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "ESZX",
        description: "AMENDMENTS TO GRANTED SPC"
    },
    {
        country_code: "AT",
        legal_code: "ESZZ",
        description: "CERTIFICATE OF PROTECTION WITHDRAWN (E-SERIES)"
    },
    {
        country_code: "AT",
        legal_code: "ETN",
        description: "DECLARATION OF NULLIFICATION IN PART"
    },
    {
        country_code: "AT",
        legal_code: "ETV",
        description: "PARTIAL RENUNCIATION"
    },
    {
        country_code: "AT",
        legal_code: "EWE",
        description: "AUTHORIZATION FOR RESTITUTION"
    },
    {
        country_code: "AT",
        legal_code: "EZF",
        description: "GRANT FOR A CERTIFICATE OF PROTECTION"
    },
    {
        country_code: "AT",
        legal_code: "HA",
        description: "CHANGE OR ADDITION OF NEW INVENTOR"
    },
    {
        country_code: "AT",
        legal_code: "HA9K",
        description: "MENTION OF THE INVENTOR"
    },
    {
        country_code: "AT",
        legal_code: "HC",
        description: "CHANGE OF THE FIRM NAME OR FIRM ADDRESS"
    },
    {
        country_code: "AT",
        legal_code: "MA03",
        description: "REVOCATION OF THE PATENT"
    },
    {
        country_code: "AT",
        legal_code: "MA04",
        description: "WITHDRAWAL (RENUNCIATION)"
    },
    {
        country_code: "AT",
        legal_code: "MA9K",
        description: "LAPSE DUE TO RENUNCIATION"
    },
    {
        country_code: "AT",
        legal_code: "MF01",
        description: "NULLIFICATION OF THE PATENT"
    },
    {
        country_code: "AT",
        legal_code: "MK05",
        description: "REVOCATION OF THE TRANSLATION OF THE EP PATENT"
    },
    {
        country_code: "AT",
        legal_code: "MK07",
        description: "EXPIRY"
    },
    {
        country_code: "AT",
        legal_code: "MM01",
        description: "LAPSE BECAUSE OF NOT PAYING ANNUAL FEES"
    },
    {
        country_code: "AT",
        legal_code: "MM9K",
        description: "LAPSE DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "AT",
        legal_code: "MN9K",
        description: "CANCELLED DUE TO LAPSE OF TIME"
    },
    {
        country_code: "AT",
        legal_code: "NF05",
        description: "REINSTATEMENT AFTER FORMER REVOCATION OF TRANSLATION OF EP PATENT"
    },
    {
        country_code: "AT",
        legal_code: "NF8K",
        description: "REINSTATED - DUE TO THE ACCEPTANCE OF A LATE YEAR MAINTENANCE FEE"
    },
    {
        country_code: "AT",
        legal_code: "NF9K",
        description: "REINSTATEMENT"
    },
    {
        country_code: "AT",
        legal_code: "NFJG",
        description: "REINSTATEMENT AFTER LATE PAYMENT OF ANNUAL FEES"
    },
    {
        country_code: "AT",
        legal_code: "PC",
        description: "CHANGE OF THE OWNER"
    },
    {
        country_code: "AT",
        legal_code: "PD9K",
        description: "CHANGE OF OWNER OF UTILITY MODEL"
    },
    {
        country_code: "AT",
        legal_code: "PTA",
        description: "AFTER OPPOSITION PARTLY REVOKED"
    },
    {
        country_code: "AT",
        legal_code: "PW9K",
        description: "PARTIAL RENOUNCEMENT"
    },
    {
        country_code: "AT",
        legal_code: "PWDR",
        description: "PARTLY WITHDRAWN"
    },
    {
        country_code: "AT",
        legal_code: "R90",
        description: "INTERRUPTION IN THE CASE REFERRED TO IN RULE 90"
    },
    {
        country_code: "AT",
        legal_code: "REF",
        description: "REFERENCE TO AT NUMBER (EP PATENT ENTERS AUSTRIAN NATIONAL PHASE)"
    },
    {
        country_code: "AT",
        legal_code: "REN",
        description: "CEASED DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "AT",
        legal_code: "RER",
        description: "CEASED AS TO PARAGRAPH 5 LIT. 3 LAW INTRODUCING PATENT TREATIES"
    },
    {
        country_code: "AT",
        legal_code: "REZ",
        description: "DELETED DUE TO WITHDRAWAL"
    },
    {
        country_code: "AT",
        legal_code: "RH",
        description: "DECLARED NULL AND VOID"
    },
    {
        country_code: "AT",
        legal_code: "RRZN",
        description: "REVOCATION OF REVOCATION"
    },
    {
        country_code: "AT",
        legal_code: "RVE",
        description: "REJECTION DUE TO AN OPPOSITION FILED WITH THE EPO"
    },
    {
        country_code: "AT",
        legal_code: "RXX",
        description: "MISCELLANEOUS"
    },
    {
        country_code: "AT",
        legal_code: "RZN",
        description: "PATENT REVOKED"
    },
    {
        country_code: "AT",
        legal_code: "SPCI",
        description: "REINSTATEMENT AFTER LATE PAYMENT OF ANNUAL FEES FOR AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCL",
        description: "LAPSE OF AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCN",
        description: "NULLIFICATION OF AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCT",
        description: "CHANGE OF THE OWNER OF AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCU",
        description: "CHANGE IN THE NAME OR ADDRESS OF THE FIRM OWING AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCW",
        description: "WITHRAWAL (RENUNCIATION) OF AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SPCX",
        description: "EXPPIRY OF AN SPC"
    },
    {
        country_code: "AT",
        legal_code: "SZA",
        description: "APPLICATION FILED FOR A CERTIFICATE OF PROTECTION"
    },
    {
        country_code: "AT",
        legal_code: "SZL",
        description: "CERTIFICATE OF PROTECTION EXPIRED"
    },
    {
        country_code: "AT",
        legal_code: "SZV",
        description: "SPC PROLONGED"
    },
    {
        country_code: "AT",
        legal_code: "SZW",
        description: "CERTIFICATE OF PROTECTION REJECTED"
    },
    {
        country_code: "AT",
        legal_code: "SZZ",
        description: "CERTIFICATE OF PROTECTION WITHDRAWN"
    },
    {
        country_code: "AT",
        legal_code: "TC9K",
        description: "CHANGE OF COMPANY"
    },
    {
        country_code: "AT",
        legal_code: "TCAT",
        description: "TRANSLATION OF PATENT CLAIMS FILED"
    },
    {
        country_code: "AT",
        legal_code: "UEP",
        description: "PUBLICATION OF TRANSLATION OF EUROPEAN PATENT SPECIFICATION"
    },
    {
        country_code: "AT",
        legal_code: "XX",
        description: "MISCELLANEOUS:"
    },
    {
        country_code: "AU",
        legal_code: "ADV",
        description: "ADVERTISEMENT"
    },
    {
        country_code: "AU",
        legal_code: "AMFD",
        description: "AMENDMENT OF FILING DATE"
    },
    {
        country_code: "AU",
        legal_code: "BG",
        description: "COMPLETE SPECIFICATIONS TREATED AS PROVISIONAL SPECIFICATIONS, SECTION 37"
    },
    {
        country_code: "AU",
        legal_code: "BH",
        description: "COMPLETE SPECIFICATION TREATED AS INNOVATION SPECIFICATION"
    },
    {
        country_code: "AU",
        legal_code: "CB",
        description: "OPPOSITION LODGED BY"
    },
    {
        country_code: "AU",
        legal_code: "CB4",
        description: "OPPOSITION UNDER SECTION 104(4) LODGED"
    },
    {
        country_code: "AU",
        legal_code: "CC",
        description: "OPPOSITION DISMISSED"
    },
    {
        country_code: "AU",
        legal_code: "CC1",
        description: "OPPOSITION DISMISSED - PROCEEDING TO SEALING"
    },
    {
        country_code: "AU",
        legal_code: "CC4",
        description: "OPPOSITION UNDER SECTION 104(4) DISMISSED"
    },
    {
        country_code: "AU",
        legal_code: "CFC",
        description: "APPLICATION WITHDRAWN - OPPOSITION PROCEEDINGS"
    },
    {
        country_code: "AU",
        legal_code: "CH",
        description: "OPPOSITION WITHDRAWN"
    },
    {
        country_code: "AU",
        legal_code: "CH4",
        description: "OPPOSITION UNDER SECTION 104(4) WITHDRAWN"
    },
    {
        country_code: "AU",
        legal_code: "CHRG",
        description: "CHARGES REGISTERED"
    },
    {
        country_code: "AU",
        legal_code: "CLAC",
        description: "LAPSED CONTINUATION FEE - OPPOSITION PROCEEDINGS"
    },
    {
        country_code: "AU",
        legal_code: "CNC5",
        description: "NOTICE OF OPPOSITION UNDER SECTION 223(6) AND CHAPTER 5"
    },
    {
        country_code: "AU",
        legal_code: "CR",
        description: "OPPOSITION PROCEEDINGS - APPLICATION REFUSED"
    },
    {
        country_code: "AU",
        legal_code: "CSOP",
        description: "COMPLETE SPECIFICATION OPEN TO PUBLIC INSPECTION ACCORDING SECT. 54 PATENTS ACT 1990"
    },
    {
        country_code: "AU",
        legal_code: "CSPA",
        description: "PROVISION UNDER SECT. 173 (PUBLICATION FORBIDDEN) REVOKED: COMPLETE SPECIFICATION ACCEPTED"
    },
    {
        country_code: "AU",
        legal_code: "CSPF",
        description: "PROVISION UNDER SECT. 173 (PUBLICATION FORBIDDEN) REVOKED: COMPLETE SPECIFICATION LODGED"
    },
    {
        country_code: "AU",
        legal_code: "CSPL",
        description: "PROVISION UNDER SECT. 173 (PUBLICATION FORBIDDEN) REVOKED: COMPLETE SPECIFICATION LAPSED"
    },
    {
        country_code: "AU",
        legal_code: "CSPO",
        description: "PROVISION UNDER SECT. 173 (PUBLICATION FORBIDDEN) REVOKED: COMPLETE SPECIFICATION OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "AU",
        legal_code: "CTIS",
        description: "COMPLETE SPECIFICATION TREATED AS INNOVATON SPECIFICATION (SECTION 104)"
    },
    {
        country_code: "AU",
        legal_code: "CW",
        description: "OPPOSITION WITHDRAWN - PROCEEDING TO SEALING"
    },
    {
        country_code: "AU",
        legal_code: "DA2",
        description: "APPLICATIONS FOR AMENDMENT SECTION 104"
    },
    {
        country_code: "AU",
        legal_code: "DA3",
        description: "AMENDMENTS MADE SECTION 104"
    },
    {
        country_code: "AU",
        legal_code: "DA4",
        description: "NOTICE OF INTENTION TO AMEND COMPL. SPEC./ LETTER PATENT ETC. PURSUANT TO ORDER 58 RULE 10 OF FED. COURT RULES"
    },
    {
        country_code: "AU",
        legal_code: "DA5",
        description: "AMENDMENT SECTION 105 PATENTS ACT 1990 - AMENDMENT DIRECTED BY COURT"
    },
    {
        country_code: "AU",
        legal_code: "DA6",
        description: "AMENDMENTS SECTION 104; APPLICATION FOR AMENDMENT WITHDRAWN"
    },
    {
        country_code: "AU",
        legal_code: "FF",
        description: "CERTIFIED INNOVATION PATENT"
    },
    {
        country_code: "AU",
        legal_code: "FGA",
        description: "LETTERS PATENT SEALED OR GRANTED (STANDARD PATENT)"
    },
    {
        country_code: "AU",
        legal_code: "FGD",
        description: "DUPLICATE LETTERS PATENT SEALED OR GRANTED"
    },
    {
        country_code: "AU",
        legal_code: "FGF",
        description: "PATENT SEALED OR GRANTED (PETTY PATENT)"
    },
    {
        country_code: "AU",
        legal_code: "FGI",
        description: "LETTERS PATENT SEALED OR GRANTED (INNOVATION PATENT)"
    },
    {
        country_code: "AU",
        legal_code: "GC",
        description: "CANCELLATION OF LICENCE AGREEMENT"
    },
    {
        country_code: "AU",
        legal_code: "GD",
        description: "LICENCE REGISTERED"
    },
    {
        country_code: "AU",
        legal_code: "GM",
        description: "MORTGAGES REGISTERED"
    },
    {
        country_code: "AU",
        legal_code: "GMD",
        description: "DISCHARGE OF A MORTGAGE"
    },
    {
        country_code: "AU",
        legal_code: "HB",
        description: "ALTERATION OF NAME IN REGISTER"
    },
    {
        country_code: "AU",
        legal_code: "HC1",
        description: "CHANGE OF APPLICANT'S NAME (SECT. 215), DEATH OF APPLICANT"
    },
    {
        country_code: "AU",
        legal_code: "HGD",
        description: "CHANGE OF NAME OF LICENCEE"
    },
    {
        country_code: "AU",
        legal_code: "MAK",
        description: "OFFER TO SURRENDER LETTERS PATENT"
    },
    {
        country_code: "AU",
        legal_code: "MAL",
        description: "SURRENDER AND REVOCATION OF LETTERS PATENT"
    },
    {
        country_code: "AU",
        legal_code: "MAY",
        description: "OFFER TO SURRENDER PETTY PATENT"
    },
    {
        country_code: "AU",
        legal_code: "MFS",
        description: "SURRENDER AND REVOCATION OF PETTY PATENT"
    },
    {
        country_code: "AU",
        legal_code: "MK1",
        description: "APPLICATION LAPSED SECTION 142(2)(A) - NO REQUEST FOR EXAMINATION IN RELEVANT PERIOD"
    },
    {
        country_code: "AU",
        legal_code: "MK10",
        description: "APPLICATION LAPSED SECTION 142(4)(B) - PETTY PATENT: APPLICANT DIDN'T COMPLY WITH A NOTICE FROM COMMISSIONER"
    },
    {
        country_code: "AU",
        legal_code: "MK11",
        description: "APPLICATION LAPSED SECTION 148(1)(C) - NOT A RELEVANT INTERNATIONAL APPLICATION"
    },
    {
        country_code: "AU",
        legal_code: "MK12",
        description: "APPLICATION LAPSED SECTION 141(1)/REG 8.3(2) - APPLICANT FILED A WRITTEN NOTICE OF WITHDRAWAL"
    },
    {
        country_code: "AU",
        legal_code: "MK13",
        description: "APPLICATION WITHDRAWN SECTION 141(2)/REG 8.3(2) - PCT APPL. NON-ENTERING NAT. PHASE; WITHDRAWN BY APPLICANT"
    },
    {
        country_code: "AU",
        legal_code: "MK14",
        description: "PATENT CEASED SECTION 143(A) (ANNUAL FEES NOT PAID) OR EXPIRED"
    },
    {
        country_code: "AU",
        legal_code: "MK15",
        description: "PATENT CEASED SECTION 143(B) - PRESCRIBED DOCUMENT NOT FILED IN TIME"
    },
    {
        country_code: "AU",
        legal_code: "MK16",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "AU",
        legal_code: "MK17",
        description: "APPLICATION LAPSED REG. 22.2B(2) - NON-PAYMENT OF FILING FEES"
    },
    {
        country_code: "AU",
        legal_code: "MK18",
        description: "APPLICATION LAPSED REG. 3.2B(3),(5) OR (6) - NON-COMPLIANCE WITH FORMALITIES DIRECTION WITHIN PRESCRIBED TIME LIMITS"
    },
    {
        country_code: "AU",
        legal_code: "MK19",
        description: "PATENT CEASED SECTION 143(A)/REG. 22.2B(2) - FEE FOR FILING A REQUEST FOR THE INNOVATION PATENT HAS NOT BEEN PAID IN TIME"
    },
    {
        country_code: "AU",
        legal_code: "MK2",
        description: "APPLICATION LAPSED SECTION 142(2)(B) - APPLICANT DIDN'T COMPLY WITH COMMISSIONER"
    },
    {
        country_code: "AU",
        legal_code: "MK20",
        description: "PATENT CEASED SECTION 143A(B)/REG. 22.2D(2) OR (4) - NON-PAYMENT OF EXAMINATION FEES WITHIN THE PRESCRIBED PERIOD"
    },
    {
        country_code: "AU",
        legal_code: "MK21",
        description: "PATENT CEASED SECTION 101C(B)/SECTION 143A(C)/REG. 9A.4 - EXAMINATION UNDER SECTION 101B HAD NOT BEEN CARRIED OUT WITHIN THE PERIOD PRESCRIBED"
    },
    {
        country_code: "AU",
        legal_code: "MK22",
        description: "PATENT CEASED SECTION 143A(D), OR EXPIRED - NON PAYMENT OF RENEWAL FEE OR EXPIRY"
    },
    {
        country_code: "AU",
        legal_code: "MK23",
        description: "PATENT CEASED SECTION 143A(E) - NO REPLY FOR CORRECTION WITHIN THE TIME ALLOWED BY THE COMMISSIONER"
    },
    {
        country_code: "AU",
        legal_code: "MK24",
        description: "APPLICATION LAPSED REG. 22.2E(2) - FAILURE TO PAY RESPONSE FEE"
    },
    {
        country_code: "AU",
        legal_code: "MK25",
        description: "APPLICATION LAPSED REG. 22.2I(2) - FAILURE TO PAY ACCEPTANCE FEE"
    },
    {
        country_code: "AU",
        legal_code: "MK3",
        description: "APPLICATION LAPSED SECTION 142(2)(C) - EXAMINATION DEFERRED UNDER SECTION 46 NO REQUEST FOR EXAMINATION"
    },
    {
        country_code: "AU",
        legal_code: "MK4",
        description: "APPLICATION LAPSED SECTION 142(2)(D) - NO CONTINUATION FEE PAID FOR THE APPLICATION"
    },
    {
        country_code: "AU",
        legal_code: "MK5",
        description: "APPLICATION LAPSED SECTION 142(2)(E) - PATENT REQUEST AND COMPL. SPECIFICATION NOT ACCEPTED"
    },
    {
        country_code: "AU",
        legal_code: "MK6",
        description: "APPLICATION LAPSED SECTION 142(2)(F)/REG. 8.3(3) - PCT APPLIC. NOT ENTERING NATIONAL PHASE"
    },
    {
        country_code: "AU",
        legal_code: "MK7",
        description: "APPLICATION LAPSED REG. 3.2A(3) - APPLICANT DID NOT COMPLY WITH FORMALITIES DIRECTION WITHIN PRESCRIBED TIME"
    },
    {
        country_code: "AU",
        legal_code: "MK8",
        description: "APPLICATION LAPSED REG. 3.4(6) - ABSTRACT NOT FILED IN TIME"
    },
    {
        country_code: "AU",
        legal_code: "MK9",
        description: "APPLICATION LAPSED SECTION 142(3) - APPLICANT DIDN'T COMPLY WITH COMMISSIONER IN TIME"
    },
    {
        country_code: "AU",
        legal_code: "NA",
        description: "APPLICATIONS RECEIVED FOR EXTENSIONS OF TIME, SECTION 223"
    },
    {
        country_code: "AU",
        legal_code: "NAA1",
        description: "APPLICATION DESIGNATING AUSTRALIA AND CLAIMING PRIORITY FROM AUSTRALIAN DOCUMENT"
    },
    {
        country_code: "AU",
        legal_code: "NB",
        description: "ALLOWED - EXTENSIONS OF TIME SECTION 223(2)"
    },
    {
        country_code: "AU",
        legal_code: "NBA",
        description: "- EXTENSIONS OF TIME- SECTION 223(1)"
    },
    {
        country_code: "AU",
        legal_code: "NBW",
        description: "APPLICATION FOR EXTENSION OF TIME UNDER SECTION 223 WITHDRAWN"
    },
    {
        country_code: "AU",
        legal_code: "NC",
        description: "EXTENSION OF TERM REQUESTED FOR STANDARD PATENT (SECT. 70)"
    },
    {
        country_code: "AU",
        legal_code: "NCF",
        description: "EXTENSION OF TERM REQUESTED FOR PETTY PATENT (SECT. 69)"
    },
    {
        country_code: "AU",
        legal_code: "NCW",
        description: "APPLICATION FOR EXTENSION OF TERM WITHDRAWN UNDER SECTION 73 (PATENTS ACT 1990)"
    },
    {
        country_code: "AU",
        legal_code: "ND",
        description: "APPLICATION OF EXTENSION OF TERM ACCEPTED"
    },
    {
        country_code: "AU",
        legal_code: "NDA",
        description: "EXTENSION OF TERM FOR STANDARD PATENT ACCEPTED (SECT.70)"
    },
    {
        country_code: "AU",
        legal_code: "NDB",
        description: "EXTENSION OF TERM FOR STANDARD PATENT GRANTED (SECT.76)"
    },
    {
        country_code: "AU",
        legal_code: "NDF",
        description: "EXTENSION OF TERM GRANTED FOR PETTY PATENT (SECT. 69)"
    },
    {
        country_code: "AU",
        legal_code: "NDP",
        description: "DECISION ON APPLICATION TO EXTEND THE TERM OF A PETTY PATENT"
    },
    {
        country_code: "AU",
        legal_code: "NDR",
        description: "EXTENSION OF TERM OF STANDARD PATENTS, SECTION 70: REFUSAL"
    },
    {
        country_code: "AU",
        legal_code: "NREF",
        description: "REFUSAL OF SECTION 223 (EXTENSION OF TIME)"
    },
    {
        country_code: "AU",
        legal_code: "ON",
        description: "OFFICIAL NOTES - DECISION OF A DELEGATE OR DEPUTY OF THE COMMISSIONER OF PATENTS"
    },
    {
        country_code: "AU",
        legal_code: "PAF",
        description: "PROVISION UNDER SECT. 173 (PUBLICATION FORBIDDEN) REVOKED: PROVISIONAL APPLICATION FILED"
    },
    {
        country_code: "AU",
        legal_code: "PC",
        description: "ASSIGNMENT REGISTERED"
    },
    {
        country_code: "AU",
        legal_code: "PC1",
        description: "ASSIGNMENT BEFORE GRANT (SECT. 113)"
    },
    {
        country_code: "AU",
        legal_code: "PCD",
        description: "PROCEEDING UNDER SECTION 215 (DEATH OF APPLICANT OR NOMINATED PERSON)"
    },
    {
        country_code: "AU",
        legal_code: "RIS",
        description: "RE-ISSUE"
    },
    {
        country_code: "AU",
        legal_code: "ROP",
        description: "REVOCATION OF PATENT"
    },
    {
        country_code: "AU",
        legal_code: "S32",
        description: "PROCEEDING UNDER SECTION 32 - DISPUTES BETWEEN APPLICANTS ETC."
    },
    {
        country_code: "AU",
        legal_code: "S37I",
        description: "INNOVATION PATENT APPLICATION TREATED AS PROVISIONAL SPECIFICATION, ACCORDINF SECT. 37"
    },
    {
        country_code: "AU",
        legal_code: "SREP",
        description: "SPECIFICATION REPUBLISHED"
    },
    {
        country_code: "AU",
        legal_code: "TC",
        description: "CHANGE OF APPLICANT'S NAME (SEC. 104)"
    },
    {
        country_code: "AU",
        legal_code: "TFD",
        description: "APPLICATIONS WITH AMENDED FILING DATES REG 3.5(A)"
    },
    {
        country_code: "AU",
        legal_code: "TH",
        description: "CORRIGENDA"
    },
    {
        country_code: "AU",
        legal_code: "WETP",
        description: "EXTENSION OF TERM OF PETTY PATENT WITHDRAWN"
    },
    {
        country_code: "BE",
        legal_code: "CA",
        description: "CHANGE OF HOLDER'S ADDRESS"
    },
    {
        country_code: "BE",
        legal_code: "CCCA",
        description: "CHANGE OF HOLDER'S ADDRESS OF SPC"
    },
    {
        country_code: "BE",
        legal_code: "CCCH",
        description: "CHANGE OF HOLDER OF SPC"
    },
    {
        country_code: "BE",
        legal_code: "CCCN",
        description: "CHANGE OH HOLDER'S NAME OF SPC"
    },
    {
        country_code: "BE",
        legal_code: "CCHA",
        description: "APPLICATION FOR A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "BE",
        legal_code: "CCHR",
        description: "REJECTION OF A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "BE",
        legal_code: "CCHT",
        description: "WITHDRAWAL OF A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "BE",
        legal_code: "CCHV",
        description: "GRANT OF A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "BE",
        legal_code: "CCLA",
        description: "LAPSE OF AN SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CCPA",
        description: "APPLICATION FOR A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CCPR",
        description: "REJECTION OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CCPT",
        description: "WITHDRAWAL OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CCPV",
        description: "GRANT OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CCRE",
        description: "EXPIRY OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BE",
        legal_code: "CH",
        description: "CHANGE OF HOLDER"
    },
    {
        country_code: "BE",
        legal_code: "CHRE",
        description: "EXPIRY OF A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "BE",
        legal_code: "CN",
        description: "CHANGE OF HOLDER'S NAME"
    },
    {
        country_code: "BE",
        legal_code: "E20",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "BE",
        legal_code: "ECA",
        description: "CHANGE OF HOLDER'S ADDRESS"
    },
    {
        country_code: "BE",
        legal_code: "ECH",
        description: "CHANGE OF HOLDER"
    },
    {
        country_code: "BE",
        legal_code: "ECN",
        description: "CHANGE OF HOLDER'S NAME"
    },
    {
        country_code: "BE",
        legal_code: "ERE",
        description: "LAPSED"
    },
    {
        country_code: "BE",
        legal_code: "ERR",
        description: "REESTABLISHED"
    },
    {
        country_code: "BE",
        legal_code: "RE",
        description: "LAPSED"
    },
    {
        country_code: "BE",
        legal_code: "RE20",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "BE",
        legal_code: "RR",
        description: "REESTABLISHED"
    },
    {
        country_code: "BE",
        legal_code: "SPCG",
        description: "GRANTED SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "BR",
        legal_code: "AN",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION OF FILING AN APPLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B01E",
        description: "INFORMATION ABOUT PCT ENTRY PROCEDURE"
    },
    {
        country_code: "BR",
        legal_code: "B03A",
        description: "PUBLICATION OF AN APPLICATION: PUBLICATION OF A PATENT APPLICATION OR OF A CERTIFICATE OF ADDITION OF INVENTION"
    },
    {
        country_code: "BR",
        legal_code: "B03B",
        description: "PUBLICATION OF AN APPLICATION: ANTICIPATED PUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B03E",
        description: "PUBLICATION OF AN APPLICATION: PUBLICATION OF WITHDRAWN APPLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B03F",
        description: "PUBLICATION OF AN APPLICATION: PUBLICATION OF APPLICATION DEFINITELY DISMISSED - ARTICLE 216, PAR 2 AND ARTICLE 17, PAR 2 OF INDUSTR. PROP. LAW"
    },
    {
        country_code: "BR",
        legal_code: "B03G",
        description: "PUBLICATION OF AN APPLICATION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B03H",
        description: "PUBLICATION OF AN APPLICATION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "B04C",
        description: "REQUEST FOR EXAMINATION: REINSTATEMENT - ARTICLE 33, SOLELY PARAGRAPH, OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B04Y",
        description: "REQUEST FOR EXAMINATION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B04Z",
        description: "REQUEST FOR EXAMINATION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B06A",
        description: "NOTIFICATION TO APPLICANT TO REPLY TO THE REPORT FOR NON-PATENTIABILITY OR INADEQUACY OF THE APPLCATION ACCORDING ART. 36 INDUSTRIAL PATENT LAW"
    },
    {
        country_code: "BR",
        legal_code: "B06F",
        description: "OBJECTIONS, DOCUMENTS AND/OR TRANSLATIONS NEEDED AFTER AN EXAMINATION REQUEST ACCORDING ART. 34 INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B06G",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: OTHER REQUIREMENTS"
    },
    {
        country_code: "BR",
        legal_code: "B06H",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: REQUIREMENT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B06I",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B06J",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B07A",
        description: "TECHNICAL EXAMINATION (OPINION): PUBLICATION OF TECHNICAL EXAMINATION (OPINION)"
    },
    {
        country_code: "BR",
        legal_code: "B07B",
        description: "TECHNICAL EXAMINATION (OPINION): PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B07C",
        description: "TECHNICAL EXAMINATION (OPINION): REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B07D",
        description: "TECHNICAL EXAMINATION (OPINION) RELATED TO ARTICLE 229 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B07E",
        description: "NOTICE OF APPROVAL RELATING TO SECTION 229 INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B07F",
        description: "NOTIFICATION OF APPROVAL THAT THERE IS NO RELATION TO ART. 229 OF LPI (PIPELINE PATENTS)"
    },
    {
        country_code: "BR",
        legal_code: "B07G",
        description: "GRANT REQUEST DOES NOT FULFILL ARTICLE 229-C LPI (PRIOR CONSENT OF ANVISA)"
    },
    {
        country_code: "BR",
        legal_code: "B08A",
        description: "APPLICATION FEES: REQUIREMENT FOR PROVING ANNUITY PAYMENT"
    },
    {
        country_code: "BR",
        legal_code: "B08E",
        description: "APPLICATION FEES: REQUIREMENT FOR COMPLEMENTATION OF ANNUITY FEE"
    },
    {
        country_code: "BR",
        legal_code: "B08F",
        description: "APPLICATION FEES: DISMISSAL - ARTICLE 86 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B08G",
        description: "APPLICATION FEES: RESTORATION"
    },
    {
        country_code: "BR",
        legal_code: "B08H",
        description: "APPLICATION FEES: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B08I",
        description: "APPLICATION FEES: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B08J",
        description: "APPLICATION FEES: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B08K",
        description: "MAINTENANCE OF ARCHIVING: APPLICATION REMAINS ARCHIVED AS NO REQUEST FOR RESTAURATION (ART. 87) HAS BEEN RECEIVED."
    },
    {
        country_code: "BR",
        legal_code: "B09A",
        description: "DECISION: GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "B09B",
        description: "DECISION: REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "B09R",
        description: "DECISION OF REFUSAL: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B09S",
        description: "DECISION OF REFUSAL: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B09T",
        description: "DECISION OF REFUSAL: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B09W",
        description: "DECISION OF GRANT: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "B09X",
        description: "DECISION OF GRANT: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B09Y",
        description: "DECISION OF GRANT: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B09Z",
        description: "DECISION OF GRANT: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B10A",
        description: "CESSATION: CESSATION CONFIRMED"
    },
    {
        country_code: "BR",
        legal_code: "B10E",
        description: "CESSATION: CESSATION NON-CONFIRMED"
    },
    {
        country_code: "BR",
        legal_code: "B10F",
        description: "CESSATION: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B10G",
        description: "CESSATION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B10H",
        description: "CESSATION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B10I",
        description: "WITHDRAWAL APPROVED ACC. ART. 29 PAR.1 OF THE IPL"
    },
    {
        country_code: "BR",
        legal_code: "B11A",
        description: "DISMISSAL ACC. ART.33 OF IPL - EXAMINATION NOT REQUESTED WITHIN 36 MONTHS OF FILING"
    },
    {
        country_code: "BR",
        legal_code: "B11B",
        description: "DISMISSAL ACC. ART. 36, PAR 1 OF IPL - NO REPLY WITHIN 90 DAYS TO FULLFIL THE NECESSARY REQUIREMENTS"
    },
    {
        country_code: "BR",
        legal_code: "B11D",
        description: "DISMISSAL ACC. ART. 38, PAR 2 OF IPL - FAILURE TO PAY FEE AFTER GRANT IN TIME"
    },
    {
        country_code: "BR",
        legal_code: "B11E",
        description: "DISMISSAL ACC. ART. 34 OF IPL - REQUIREMENTS FOR EXAMINATION INCOMPLETE"
    },
    {
        country_code: "BR",
        legal_code: "B11F",
        description: "DISMISSAL ACC. ARTICLE 216, PAR 2 OF IPL - QUALIFICATION OF ATTORNEY NOT PROVIDED"
    },
    {
        country_code: "BR",
        legal_code: "B11K",
        description: "DISMISSAL ACC. ART. 17, PAR 2 OF IPL - PENDING EARLIER APPLICATION (PRIORITY CLAIM) DEFINITIVELY SHELVED"
    },
    {
        country_code: "BR",
        legal_code: "B11L",
        description: "DISMISSAL: DISMISSAL - ARTICLE 26, SOLELY PARAGRAPH OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B11M",
        description: "DISMISSAL: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B11N",
        description: "DISMISSAL: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B11O",
        description: "DISMISSAL: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B11P",
        description: "DISMISSAL: RESTORATION"
    },
    {
        country_code: "BR",
        legal_code: "B11Q",
        description: "DISMISSAL: THE CERTIFICATE OF ADDITION WAS NOT ACCESSORY TO ANY PATENT, OR A PATENT WHICH WAS NOMINATED ACCESSORY AND NO LONGER EXISTS"
    },
    {
        country_code: "BR",
        legal_code: "B11Y",
        description: "DEFINITIVE DISMISSAL ACC. ARTICLE 33 OF IPL - EXTENSION OF TIME LIMIT FOR REQUEST OF EXAMINATION EXPIRED"
    },
    {
        country_code: "BR",
        legal_code: "B11Z",
        description: "DISMISSAL: PETITION DISMISSAL - ARTICLE 216, PAR 2 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B12A",
        description: "APPEAL: APPEAL AGAINST GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "B12B",
        description: "APPEAL: APPEAL AGAINST REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "B12C",
        description: "APPEAL: APPEAL AGAINST DISMISSAL"
    },
    {
        country_code: "BR",
        legal_code: "B12F",
        description: "APPEAL: OTHER APPEALS"
    },
    {
        country_code: "BR",
        legal_code: "B12G",
        description: "APPEAL: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B12H",
        description: "APPEAL: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B13A",
        description: "NOTIFICATION OF FEES DUE RELATED TO THE EXPEDITION OF A LETTER PATENT OF A GRANTED PATENT"
    },
    {
        country_code: "BR",
        legal_code: "B13B",
        description: "FEES DUE RELATED TO THE EXPEDITION OF A LETTER PATENT: PUBLICATION OF LETTER-PATENT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B14F",
        description: "ANNUAL PAYMENT - PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B150",
        description: "OTHERS CONCERNING APPLICATIONS: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B151",
        description: "OTHERS CONCERNING APPLICATIONS: RESOLUTION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B152",
        description: "OTHERS CONCERNING APPLICATIONS: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B153",
        description: "OTHERS CONCERNING APPLICATIONS: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B15G",
        description: "OTHERS CONCERNING APPLICATIONS: UNKNOWN PETITION"
    },
    {
        country_code: "BR",
        legal_code: "B15H",
        description: "OTHERS CONCERNING APPLICATIONS: SUSPENDED PETITION"
    },
    {
        country_code: "BR",
        legal_code: "B15I",
        description: "OTHERS CONCERNING APPLICATIONS: LOSS OF PRIORITY"
    },
    {
        country_code: "BR",
        legal_code: "B15J",
        description: "OTHERS CONCERNING APPLICATIONS: CHANGING OF NATURE"
    },
    {
        country_code: "BR",
        legal_code: "B15K",
        description: "OTHERS CONCERNING APPLICATIONS: ALTERATION OF CLASSIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "B15L",
        description: "OTHERS CONCERNING APPLICATIONS: RENUMBERING"
    },
    {
        country_code: "BR",
        legal_code: "B15N",
        description: "OTHERS CONCERNING APPLICATIONS: NOTIFICATION OF JUDICIAL DECISION"
    },
    {
        country_code: "BR",
        legal_code: "B15U",
        description: "OTHERS CONCERNING APPLICATIONS: NUMBERING CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B15V",
        description: "PROLONGATION OF TIME LIMIT ALLOWED"
    },
    {
        country_code: "BR",
        legal_code: "B15W",
        description: "OTHERS CONCERNING APPLICATIONS: REQUEST ACCORDING TO THE LAW"
    },
    {
        country_code: "BR",
        legal_code: "B15Z",
        description: "PROLONGATION OF TIME LIMIT REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B16A",
        description: "PATENT OR CERTIFICATE OF ADDITION OF INVENTION GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B16B",
        description: "NOTIFICATION OF GRANT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B16C",
        description: "CORRECTION OF NOTIFICATION OF THE GRANT"
    },
    {
        country_code: "BR",
        legal_code: "B16D",
        description: "GRANT OF PATENT OR CERTIFICATE OF ADDITION OF INVENTION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B17A",
        description: "NOTIFICATION OF ADMINISTRATIVE NULLITY(PATENTEE HAS 60 DAYS TIME TO REPLY TO THIS NOTIFICATION)"
    },
    {
        country_code: "BR",
        legal_code: "B17B",
        description: "NOTIFICATION OF ADMINISTRATIVE NULLITY CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B17C",
        description: "ADMINISTRATIVE NULLITY: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B18A",
        description: "PATENT BECAME FORFEIT BY LACK OF EXPLOITATION (AFTER REQUEST OF THIRD PARTY)"
    },
    {
        country_code: "BR",
        legal_code: "B18C",
        description: "LAPSE: LAPSE GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B18D",
        description: "FORFEITURE OF PATENT (LACK OF EXPLOITATION) REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B18E",
        description: "LAPSE: APPEAL AGAINST LAPSE GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "B18F",
        description: "LAPSE: APPEAL AGAINST LAPSE REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B18J",
        description: "LAPSE: LAPSE DESISTANCE"
    },
    {
        country_code: "BR",
        legal_code: "B18K",
        description: "LAPSE: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B18L",
        description: "LAPSE: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B18M",
        description: "LAPSE: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B19A",
        description: "NOTIFICATION OF JUDICIAL DECISION: NOTIFICATION OF JUDICIAL DECISION"
    },
    {
        country_code: "BR",
        legal_code: "B19B",
        description: "NOTIFICATION OF JUDICIAL DECISION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B19C",
        description: "NOTIFICATION OF JUDICIAL DECISION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "B21A",
        description: "EXPIRY ACC. ART. 78, ITEM I OF IPL- EXPIRY OF THE TERM OF PROTECTION"
    },
    {
        country_code: "BR",
        legal_code: "B21B",
        description: "EXTINCTION ACC. ART. 78, ITEM II - ON WAIVER BY THE PATENTEE, WITHOUT PREJUDICE TO THE RIGHTS OF THIRD PARTIES"
    },
    {
        country_code: "BR",
        legal_code: "B21F",
        description: "LAPSE ACC. ART. 78, ITEM IV - ON NON-PAYMENT OF THE ANNUAL FEES IN TIME"
    },
    {
        country_code: "BR",
        legal_code: "B21G",
        description: "EXTINGUISHMENT OF A PATENT OR OF A CERTIFICATE OF ADDITION OF INVENTION: EXTINGUISHMENT - ARTICLE 78, ITEM V OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "B21H",
        description: "EXTINGUISHMENT OF A PATENT OR OF A CERTIFICATE OF ADDITION OF INVENTION: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B21I",
        description: "EXTINGUISHMENT OF A PATENT OR OF A CERTIFICATE OF ADDITION OF INVENTION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B21J",
        description: "EXTINGUISHMENT OF A PATENT OR OF A CERTIFICATE OF ADDITION OF INVENTION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B22B",
        description: "NO RECOGNITION OF AN APPLICATION ACC. ART. 218 OR 219 LPI (NOT IN TIME, WITHOUT LEGAL BASIS OR WITHOUT PROOF OF RESPECTIVE PAYMENTS)"
    },
    {
        country_code: "BR",
        legal_code: "B22C",
        description: "PETITION HALTED"
    },
    {
        country_code: "BR",
        legal_code: "B22D",
        description: "APPLICATION FOR COMPULSORY LICENCE (ART. 68 LPI)"
    },
    {
        country_code: "BR",
        legal_code: "B22E",
        description: "ADDITIONAL ADEQUACY REQUIREMENTS FOR AN APPLICATION NEEDED"
    },
    {
        country_code: "BR",
        legal_code: "B22J",
        description: "NOTICE OF APPEAL TO THE PRESIDENT OF INPI AGAINST THE DECISION OF PATENT DIRECTORATE, AIMING TO REVIEW THE MATTER"
    },
    {
        country_code: "BR",
        legal_code: "B22K",
        description: "REQUEST FOR PROLONGATION OF TIME LIMITS ACC. ART 221 LPI"
    },
    {
        country_code: "BR",
        legal_code: "B22L",
        description: "NOTIFICATION OF LICENCE OFFER (ART 64 PAR 1 OF LPI)"
    },
    {
        country_code: "BR",
        legal_code: "B22M",
        description: "WITHDRAWAL OF LICENCE OFFER (ART 64 PAR 4 OF LPI)"
    },
    {
        country_code: "BR",
        legal_code: "B22N",
        description: "DISMISSAL OF PETITION DUE TO NO NOMINATION OF REPRESENTATIVE GIVEN IN TIME (ART 216 PAR 2 OF LPI)"
    },
    {
        country_code: "BR",
        legal_code: "B22O",
        description: "OTHERS REFERRING TO PATENTS AND CERTIFICATE OF ADDITION OF INVENTION: REQUEST ACCORDING TO THE LAW"
    },
    {
        country_code: "BR",
        legal_code: "B22T",
        description: "FORMER PUBLICATION OF SECTION 22 IN GAZETTE (PRS CODES B22?) CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B22U",
        description: "FORMER ACTIONS ACCORDING GAZETTE SECTION 22 (PRS CODES B22?) CANCELLED DUE TO TECHNICAL ERRORS"
    },
    {
        country_code: "BR",
        legal_code: "B22V",
        description: "FORMER ACTIONS ACCORDING GAZETTE SECTION 22 (PRS CODES B22?) ANNULLED DUE TO TECHNICAL ERROR"
    },
    {
        country_code: "BR",
        legal_code: "B22W",
        description: "FORMER PUBLICATION OF GAZETTE SECTION 22 (PRS CODES B22?) REPUBLISHED DUE TO TECHNICAL ERROR"
    },
    {
        country_code: "BR",
        legal_code: "B23A",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION OF FILING AN APPLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B23B",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: REQUIREMENT"
    },
    {
        country_code: "BR",
        legal_code: "B23C",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: PUBLICATION OF APPLICATION FOR THIRD PARTIES SUBMISSION OF COMMENTS"
    },
    {
        country_code: "BR",
        legal_code: "B23D",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION FOR APPLICANT SUBMISSION OF COMMENTS"
    },
    {
        country_code: "BR",
        legal_code: "B23E",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: ANNUITY"
    },
    {
        country_code: "BR",
        legal_code: "B23F",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: DISMISSAL"
    },
    {
        country_code: "BR",
        legal_code: "B23G",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: APPLICATION REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "B23H",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: APPEAL"
    },
    {
        country_code: "BR",
        legal_code: "B23I",
        description: "PROCESSING APPLICATIONS ACC. ART. 230 AND 231 (PIPELINE PATENT) PATENT ISSUED"
    },
    {
        country_code: "BR",
        legal_code: "B23J",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B23K",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B23L",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "B23M",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "B23N",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B23O",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: EXPEDITION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B23P",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: OTHERS"
    },
    {
        country_code: "BR",
        legal_code: "B23Q",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: TECHNICAL EXAMINATION (OPINION) RELATED TO ART. 229 OF LPI"
    },
    {
        country_code: "BR",
        legal_code: "B23R",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION OF PRESENTATION OF AN ADMINISTRATIVE NULLITY"
    },
    {
        country_code: "BR",
        legal_code: "B23S",
        description: "PIPELINE PATENT EXPIRED"
    },
    {
        country_code: "BR",
        legal_code: "B23Z",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION OF FILING A DIVIDED APPLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B24A",
        description: "PATENT ANNUAL FEE: REQUIREMENT FOR PROVING OF PAYMENT OF ANNUAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "B24B",
        description: "PATENT ANNUAL FEE: REQUIREMENT FOR COMPLEMENTING ANNUAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "B24C",
        description: "PATENT ANNUAL FEE: CALLING FOR RESTORATION"
    },
    {
        country_code: "BR",
        legal_code: "B24D",
        description: "PATENT ANNUAL FEE: RESTORATION"
    },
    {
        country_code: "BR",
        legal_code: "B24E",
        description: "PATENT ANNUAL FEE: RESOLUTION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B24F",
        description: "PATENT ANNUAL FEE: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B24G",
        description: "PATENT ANNUAL FEE: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B25A",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: TRANSFER GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B25B",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: TRANSFER REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B25C",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: TRANSFER ON REQUIREMENT"
    },
    {
        country_code: "BR",
        legal_code: "B25D",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: CHANGE OF NAME GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B25E",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: CHANGE OF NAME REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B25F",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIF. OF ADDITION OF INVENTION: CHANGE OF NAME ON REQUIREMENT"
    },
    {
        country_code: "BR",
        legal_code: "B25G",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIF. OF ADDITION OF INVENTION: CHANGE OF HEADQUARTER GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B25H",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIF. OF ADDITION OF INVENTION: CHANGE OF HEADQUARTER REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "B25I",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPL., PATENT AND CERTIF. OF ADD. OF INVENT.: CHANGE OF HEADQUARTER ON REQUIREMENT"
    },
    {
        country_code: "BR",
        legal_code: "B25J",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: RESOLUTION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B25K",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B25L",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: PUBLICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "B25M",
        description: "LIMITATIONS IN CHANGING THE PROPRIETORSHIP"
    },
    {
        country_code: "BR",
        legal_code: "B25O",
        description: "OTHERS REFERRING TO PATENTS AND CERTIFICATE OF ADDITION OF INVENTION: REQUEST ACCORDING TO THE LAW"
    },
    {
        country_code: "BR",
        legal_code: "B27A",
        description: "FILING FOR A GREEN PATENT (PATENTE VERDE)"
    },
    {
        country_code: "BR",
        legal_code: "B27B",
        description: "REQUEST FOR A GREEN PATENT GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "B27C",
        description: "REQUEST FOR A GREEN PATENT DENIED"
    },
    {
        country_code: "BR",
        legal_code: "B65X",
        description: "NOTIFICATION OF REQUIREMENT FOR PRIORITY EXAMINATION OF PATENT APPLICATION"
    },
    {
        country_code: "BR",
        legal_code: "B65Y",
        description: "GRANT OF PRIORITY EXAMINATION OF THE PATENT APPLICATION (REQUEST COMPLIES WITH DEC. 132/06 OF 20061117)"
    },
    {
        country_code: "BR",
        legal_code: "B65Z",
        description: "PRIORITY EXAMINATION OF THE PATENT APPLICATION REFUSED (REQUEST DOES NOT COMPLY WITH DEC. 132/06 OF 20061117)"
    },
    {
        country_code: "BR",
        legal_code: "BAP",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: PUBLICATION OF APPLICATION FOR THIRD PARTIES SUBMISSION OF COMMENTS"
    },
    {
        country_code: "BR",
        legal_code: "BR",
        description: "PUBLICATION OF AN APPLICATION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "CAF",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION FOR APPLICANT SUBMISSION OF COMMENTS"
    },
    {
        country_code: "BR",
        legal_code: "CB",
        description: "OPPOSITION FILED"
    },
    {
        country_code: "BR",
        legal_code: "CC",
        description: "OPPOSITION REJECTED"
    },
    {
        country_code: "BR",
        legal_code: "CK",
        description: "APPEAL"
    },
    {
        country_code: "BR",
        legal_code: "CKFA",
        description: "APPEAL AGAINST DEEMED WITHDRAWAL"
    },
    {
        country_code: "BR",
        legal_code: "CKFC",
        description: "APPEAL: APPEAL AGAINST REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "CKFF",
        description: "APPEAL AGAINST GRANT"
    },
    {
        country_code: "BR",
        legal_code: "CKXX",
        description: "APPEAL: OTHER APPEALS"
    },
    {
        country_code: "BR",
        legal_code: "EE",
        description: "REQUEST FOR EXAMINATION"
    },
    {
        country_code: "BR",
        legal_code: "EG",
        description: "TECHNICAL EXAMINATION (OPINION): PUBLICATION OF TECHNICAL EXAMINATION (OPINION)"
    },
    {
        country_code: "BR",
        legal_code: "EH",
        description: "EXAMINATION SUSPENDED"
    },
    {
        country_code: "BR",
        legal_code: "ENF",
        description: "REQUEST FOR EXAMINATION: REINSTATEMENT - ARTICLE 33, SOLELY PARAGRAPH, OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "ENTF",
        description: "CHANGE OF NAME OF OWNER OF APPLICANT"
    },
    {
        country_code: "BR",
        legal_code: "FA",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "BR",
        legal_code: "FA1",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 18(2))"
    },
    {
        country_code: "BR",
        legal_code: "FA10",
        description: "DISMISSAL: DISMISSAL - ARTICLE 33 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA11",
        description: "DISMISSAL: DISMISSAL - ARTICLE 38, PAR. 2 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA12",
        description: "DISMISSAL: DISMISSAL - ARTICLE 216, PAR. 2 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA13",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: DISMISSAL"
    },
    {
        country_code: "BR",
        legal_code: "FA14",
        description: "DISMISSAL: DISMISSAL - ARTICLE 34 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA15",
        description: "DISMISSAL: DISMISSAL - ARTICLE 17, PAR. 2 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA2",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 19(5))"
    },
    {
        country_code: "BR",
        legal_code: "FA3",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 19(6))"
    },
    {
        country_code: "BR",
        legal_code: "FA4",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 21(1))"
    },
    {
        country_code: "BR",
        legal_code: "FA5",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 106)"
    },
    {
        country_code: "BR",
        legal_code: "FA6",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 115(1))"
    },
    {
        country_code: "BR",
        legal_code: "FA7",
        description: "APPLICATION DEEMED WITHDRAWN (ART. 18 PAR. 1 OF LAW 5772/71) - BEING CONTRARY TO MORALS, GOOD CUSTOMS AND PUBLIC SECURITY, ORDER AND HEALTH"
    },
    {
        country_code: "BR",
        legal_code: "FA8",
        description: "DISMISSAL: DISMISSAL - ARTICLE 36, PAR. 1 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FA9",
        description: "APPLICATION DEEMED WITHDRAWN - FAILURE TO COMPLY WITH REQUIREMENTS"
    },
    {
        country_code: "BR",
        legal_code: "FB",
        description: "APPLICATION SUSPENDED"
    },
    {
        country_code: "BR",
        legal_code: "FB19",
        description: "GRANT PROCEDURE SUSPENDED (ART. 19)"
    },
    {
        country_code: "BR",
        legal_code: "FB20",
        description: "GRANT PROCEDURE SUSPENDED (ART. 20)"
    },
    {
        country_code: "BR",
        legal_code: "FB34",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: REQUIREMENT - ARTICLE 34 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FB36",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: REQUIREMENT - ARTICLE 36 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FBA",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: NOTIFICATION OF PRESENTATION OF AN ADMINISTRATIVE NULLITY"
    },
    {
        country_code: "BR",
        legal_code: "FBOS",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: OTHER REQUIREMENTS"
    },
    {
        country_code: "BR",
        legal_code: "FC",
        description: "DECISION: REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "FD1",
        description: "APPL. LAPSED DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "FD2",
        description: "APPL. LAPSED DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "FD3",
        description: "APPL. LAPSED DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "FD4",
        description: "APPL. LAPSED DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "FD5",
        description: "APPLICATION FEES: DISMISSAL - ARTICLE 86 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "FF",
        description: "DECISION: GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "FG",
        description: "LETTER PATENT GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "FG9A",
        description: "PATENT OR CERTIFICATE OF ADDITION GRANTED"
    },
    {
        country_code: "BR",
        legal_code: "FGAN",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: GRANTING"
    },
    {
        country_code: "BR",
        legal_code: "FM",
        description: "OTHERS CONCERNING APPLICATIONS: UNKNOWN PETITION"
    },
    {
        country_code: "BR",
        legal_code: "FN",
        description: "REQUEST PENDING"
    },
    {
        country_code: "BR",
        legal_code: "FRL",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.276.96: APPEAL"
    },
    {
        country_code: "BR",
        legal_code: "GA",
        description: "CHANGE OF TYPE OF RIGHT"
    },
    {
        country_code: "BR",
        legal_code: "GB",
        description: "TRANSFER"
    },
    {
        country_code: "BR",
        legal_code: "GBP",
        description: "TRANSFER PENDING"
    },
    {
        country_code: "BR",
        legal_code: "GBR",
        description: "TRANSFER REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "GE",
        description: "REQUEST FOR COMPULSORY LICENSE"
    },
    {
        country_code: "BR",
        legal_code: "GLA",
        description: "OTHERS CONCERNING APPLICATIONS: NOTIFICATION OF JUDICIAL DECISION"
    },
    {
        country_code: "BR",
        legal_code: "HC",
        description: "CHANGE OF NAME"
    },
    {
        country_code: "BR",
        legal_code: "HCP",
        description: "CHANGE OF NAME PENDING"
    },
    {
        country_code: "BR",
        legal_code: "HCR",
        description: "CHANGE OF NAME REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "HE",
        description: "CHANGE OF ADDRESS"
    },
    {
        country_code: "BR",
        legal_code: "HEP",
        description: "CHANGE OF ADDRESS PENDING"
    },
    {
        country_code: "BR",
        legal_code: "HER",
        description: "CHANGE OF ADDRESS REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "HHB",
        description: "PUBLICATION OF AN APPLICATION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHC",
        description: "NOTICE OF OPPOSITION (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHCH",
        description: "APPEAL (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHCK",
        description: "APPEAL (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHEE",
        description: "REQUEST FOR EXAMINATION (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHEG",
        description: "APPLICATION REFUSED (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHEH",
        description: "EXAMINATION SUSPENDED (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHFA",
        description: "APPLICATION WITHDRAWN (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHFB",
        description: "GRANT PROCEDURE SUSPENDED (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHFC",
        description: "GRANT REFUSED (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHFF",
        description: "DECISION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHFG",
        description: "GRANTING PATENT OR CERTIFICATE OF ADDITION OF INVENTION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHFI",
        description: "DECISION: RECTIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHFK",
        description: "PROCESSING APPLICATIONS ACCORDING TO ARTICLES 230 AND 231 OF LAW 9.279/96: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHFN",
        description: "APPLICATION DEEMED WITHDRAWN (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHH",
        description: "TRANSFER OR CHANGE (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHKD",
        description: "FEES DUE (LETTER PATENT) (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHM",
        description: "EXPIRATION OR DISCLAIMER (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHME",
        description: "REQUEST FOR REVOCATION (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHMR",
        description: "LAPSE DECISION (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHN",
        description: "APPLICATION DEEMED WITHDRAWN (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHRL",
        description: "COURT DECISION PUBLISHED (CORR.)"
    },
    {
        country_code: "BR",
        legal_code: "HHT",
        description: "ENTRY OF CHANGE OF NAME AND/OR HEADQUARTER AND TRANSFER OF APPLICATION, PATENT AND CERTIFICATE OF ADDITION OF INVENTION: REPUBLICATION"
    },
    {
        country_code: "BR",
        legal_code: "HHX",
        description: "CORRECTION"
    },
    {
        country_code: "BR",
        legal_code: "HIC",
        description: "OPPOSITION REJECTION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIEH",
        description: "EXAMINATION SUSPENSION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIFA",
        description: "APPLICATION WITHDRAWAL CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIFB",
        description: "TECHNICAL AND FORMAL REQUIREMENTS: REQUIREMENT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIFC",
        description: "REFUSAL CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIFD",
        description: "DESISTANCE: DESISTANCE NON-CONFIRMED"
    },
    {
        country_code: "BR",
        legal_code: "HIFF",
        description: "PATENT GRANT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIFN",
        description: "APPLICATION DEEMED WITHDRAWN CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIH",
        description: "TRANSFER OR CHANGE CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIM",
        description: "EXPIRATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIMR",
        description: "LAPSE DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIT",
        description: "TRANSFER OR CHANGE CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIX",
        description: "NOTIFICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HIXX",
        description: "DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HJEG",
        description: "TECHNICAL EXAMINATION (OPINION): TECHNICAL EXAMINATION (OPINION) RELATED TO ARTICLE 229 OF INDUSTRIAL PROPERTY LAW"
    },
    {
        country_code: "BR",
        legal_code: "HKAN",
        description: "GRANT PROCEDURE SUSPENDED (CORRECTION) - ACCORDING TO ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "BR",
        legal_code: "HKB",
        description: "APPLICATION PUBLISHED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKC",
        description: "NOTICE OF OPPOSITION (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKCK",
        description: "APPEAL (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKEE",
        description: "REQUEST FOR EXAMINATION (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKEG",
        description: "APPLICATION REFUSED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKEH",
        description: "EXAMINATION SUSPENDED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFA",
        description: "APPLICATION WITHDRAWN (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFB",
        description: "GRANT PROCEDURE SUSPENDED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFC",
        description: "GRANT REFUSED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFF",
        description: "PATENT GRANTED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFG",
        description: "LETTER PATENT GRANTED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKFN",
        description: "APPLICATION DEEMED WITHDRAWN (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKH",
        description: "TRANSFER OR CHANGE (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKKD",
        description: "FEES DUE (LETTER PATENT) (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKM",
        description: "EXPIRATION OR DISCLAIMER (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKME",
        description: "REQUEST FOR REVOCATION (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKMR",
        description: "LAPSE DECISION (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKRL",
        description: "COURT DECISION PUBLISHED (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKT",
        description: "TRANSFER OR CHANGE (DELETED)"
    },
    {
        country_code: "BR",
        legal_code: "HKX",
        description: "PUBLICATION DELETED"
    },
    {
        country_code: "BR",
        legal_code: "HN",
        description: "CHANGE OF NUMBER"
    },
    {
        country_code: "BR",
        legal_code: "HNA",
        description: "APPLICATION NUMBER CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "HO",
        description: "CHANGE OF CLASSIFICATION"
    },
    {
        country_code: "BR",
        legal_code: "HP",
        description: "CLAIMED PRIORITY LOST"
    },
    {
        country_code: "BR",
        legal_code: "HPL",
        description: "PRIORITY GUARANTEE EXPIRED"
    },
    {
        country_code: "BR",
        legal_code: "KA",
        description: "ANNUAL FEE DUE"
    },
    {
        country_code: "BR",
        legal_code: "KAB",
        description: "RENEWAL FEES DUE"
    },
    {
        country_code: "BR",
        legal_code: "KD",
        description: "FEES DUE (LETTER PATENT)"
    },
    {
        country_code: "BR",
        legal_code: "KD1",
        description: "PAYMENT OF COMPLEMENTARY FEE REQUESTED"
    },
    {
        country_code: "BR",
        legal_code: "KE",
        description: "NOTIFICATION FOR PAYEMENT OF FEE FOR THE DELIVERY OF LETTER PATENTS OF AN APPLICATION GRANTED BY VIRTUE OF LAW 5772/71"
    },
    {
        country_code: "BR",
        legal_code: "KF",
        description: "REQUEST FOR PROOF OF PAYMENT OF ANNUAL FEE"
    },
    {
        country_code: "BR",
        legal_code: "MB",
        description: "REQUEST FOR LAPSE"
    },
    {
        country_code: "BR",
        legal_code: "MC",
        description: "LETTER PATENT ANNULLED"
    },
    {
        country_code: "BR",
        legal_code: "MD",
        description: "REQUEST REFUSED - ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "BR",
        legal_code: "ME",
        description: "REQUEST FOR REVOCATION"
    },
    {
        country_code: "BR",
        legal_code: "MFC",
        description: "GRANT ANNULLED"
    },
    {
        country_code: "BR",
        legal_code: "MH",
        description: "PATENT DISCLAIMER"
    },
    {
        country_code: "BR",
        legal_code: "MK",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "BR",
        legal_code: "MM",
        description: "LAPSE DUE TO NON-PAYMENT OF FEES (ART. 50)"
    },
    {
        country_code: "BR",
        legal_code: "MR",
        description: "LAPSE"
    },
    {
        country_code: "BR",
        legal_code: "MRB",
        description: "REQUEST FOR LAPSE REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "MRR",
        description: "APPEAL AGAINST LAPSE REFUSAL"
    },
    {
        country_code: "BR",
        legal_code: "MS",
        description: "PATENT SUSPENDED"
    },
    {
        country_code: "BR",
        legal_code: "MT",
        description: "PATENT SUSPENDED - ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "BR",
        legal_code: "NB",
        description: "PATENT ISSUED - ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "BR",
        legal_code: "ND",
        description: "EXTENSION OF TIME ALLOWED"
    },
    {
        country_code: "BR",
        legal_code: "NDF",
        description: "EXTENSION OF TIME ALLOWED - ART 21"
    },
    {
        country_code: "BR",
        legal_code: "NF",
        description: "APPLICATION RESTORED"
    },
    {
        country_code: "BR",
        legal_code: "PC",
        description: "TRANSFER"
    },
    {
        country_code: "BR",
        legal_code: "PCP",
        description: "TRANSFER PENDING"
    },
    {
        country_code: "BR",
        legal_code: "PCR",
        description: "TRANSFER REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "RH",
        description: "REQUEST REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "RI",
        description: "REQUEST PENDING"
    },
    {
        country_code: "BR",
        legal_code: "RL",
        description: "COURT DECISION PUBLISHED"
    },
    {
        country_code: "BR",
        legal_code: "RLL",
        description: "OTHER REQUESTS - ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "BR",
        legal_code: "RMB",
        description: "APPEAL AGAINST LAPSE"
    },
    {
        country_code: "BR",
        legal_code: "TC",
        description: "CHANGE OF PROPRIETOR'S NAME"
    },
    {
        country_code: "BR",
        legal_code: "TCP",
        description: "CHANGE OF PROPRIETOR'S NAME PENDING"
    },
    {
        country_code: "BR",
        legal_code: "TCR",
        description: "CHANGE OF PROPRIETOR'S NAME REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "TE",
        description: "CHANGE OF ADDRESS"
    },
    {
        country_code: "BR",
        legal_code: "TEP",
        description: "CHANGE OF ADDRESS PENDING"
    },
    {
        country_code: "BR",
        legal_code: "TER",
        description: "CHANGE OF ADDRESS REFUSED"
    },
    {
        country_code: "BR",
        legal_code: "THX",
        description: "CORRECTION"
    },
    {
        country_code: "BR",
        legal_code: "TIX",
        description: "NOTIFICATION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "TIXX",
        description: "DECISION CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "TKX",
        description: "LAST ANNOUNCEMENT CANCELLED"
    },
    {
        country_code: "BR",
        legal_code: "TKX1",
        description: "GRANT PROCEDURE SUSPENDED (CANCELLED) - ACCORDING TO ARTICLES 230 AND 231 OF LAW 9279/96"
    },
    {
        country_code: "CA",
        legal_code: "712J",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECT. 12/1977)"
    },
    {
        country_code: "CA",
        legal_code: "740B",
        description: "GB: APPLICATION DECIDED BY THE COMPTROLLER (SECT. 40/1977)"
    },
    {
        country_code: "CA",
        legal_code: "AFNE",
        description: "NATIONAL PHASE ENTRY"
    },
    {
        country_code: "CA",
        legal_code: "AZWC",
        description: "WITHDRAWN (CORRECTION)"
    },
    {
        country_code: "CA",
        legal_code: "AZWI",
        description: "WITHDRAWN APPLICATION"
    },
    {
        country_code: "CA",
        legal_code: "EEER",
        description: "EXAMINATION REQUEST"
    },
    {
        country_code: "CA",
        legal_code: "FZDC",
        description: "CORRECTION OF DEAD APPLICATION (REINSTATEMENT)"
    },
    {
        country_code: "CA",
        legal_code: "FZDE",
        description: "DEAD"
    },
    {
        country_code: "CA",
        legal_code: "MKEC",
        description: "EXPIRY (CORRECTION)"
    },
    {
        country_code: "CA",
        legal_code: "MKEX",
        description: "EXPIRY"
    },
    {
        country_code: "CA",
        legal_code: "MKLA",
        description: "LAPSED"
    },
    {
        country_code: "CA",
        legal_code: "MKLC",
        description: "LAPSED (CORRECTION)"
    },
    {
        country_code: "CA",
        legal_code: "MZSC",
        description: "SURRENDER (CORRECTION)"
    },
    {
        country_code: "CA",
        legal_code: "MZSU",
        description: "SURRENDER"
    },
    {
        country_code: "CA",
        legal_code: "NARC",
        description: "RE-EXAMINATION CERTIFICATE"
    },
    {
        country_code: "CA",
        legal_code: "NARE",
        description: "REISSUED"
    },
    {
        country_code: "CH",
        legal_code: "AE",
        description: "APPLIED"
    },
    {
        country_code: "CH",
        legal_code: "AECN",
        description: "CONTINUATION OF PROCEEDINGS AGREED"
    },
    {
        country_code: "CH",
        legal_code: "AELC",
        description: "CONTINUATION IN CHANGED FORM"
    },
    {
        country_code: "CH",
        legal_code: "AELM",
        description: "LIMITATION AGREED"
    },
    {
        country_code: "CH",
        legal_code: "AEN",
        description: "MODIFICATION OF THE SCOPE OF THE PATENT"
    },
    {
        country_code: "CH",
        legal_code: "AEPS",
        description: "PARTIAL WAIVER"
    },
    {
        country_code: "CH",
        legal_code: "AERE",
        description: "REACTIVATION AGREED"
    },
    {
        country_code: "CH",
        legal_code: "AERF",
        description: "REACTIVATION AFTER ERRONEOUS DELETION"
    },
    {
        country_code: "CH",
        legal_code: "AUV",
        description: "UNDELIVERABLE DECISIONS OPENED (PATENTS)"
    },
    {
        country_code: "CH",
        legal_code: "AUVA",
        description: "UNDELIVERABLE DECISIONS OPENED (APPLICATIONS)"
    },
    {
        country_code: "CH",
        legal_code: "AZW",
        description: "REJECTION (APPLICATION)"
    },
    {
        country_code: "CH",
        legal_code: "AZZ",
        description: "WITHDRAWAL (APPLICATION)"
    },
    {
        country_code: "CH",
        legal_code: "EP",
        description: "ENTRY IN THE NATIONAL PHASE"
    },
    {
        country_code: "CH",
        legal_code: "GK",
        description: "CORRECTION OF THE APPLICATION"
    },
    {
        country_code: "CH",
        legal_code: "NE",
        description: "PATENT NOT CEASED"
    },
    {
        country_code: "CH",
        legal_code: "NV",
        description: "NEW AGENT"
    },
    {
        country_code: "CH",
        legal_code: "PCAR",
        description: "CHANGE OF THE ADDRESS OF THE REPRESENTATIVE"
    },
    {
        country_code: "CH",
        legal_code: "PCOW",
        description: "CHANGE OF ADDRESS OF PATENT OWNER(S)"
    },
    {
        country_code: "CH",
        legal_code: "PFA",
        description: "NAME/FIRM CHANGED"
    },
    {
        country_code: "CH",
        legal_code: "PFUS",
        description: "MERGER"
    },
    {
        country_code: "CH",
        legal_code: "PK",
        description: "CORRECTION"
    },
    {
        country_code: "CH",
        legal_code: "PL",
        description: "PATENT CEASED"
    },
    {
        country_code: "CH",
        legal_code: "PLI",
        description: "LICENSE"
    },
    {
        country_code: "CH",
        legal_code: "PLIA",
        description: "CANCELLATION OF LICENSE"
    },
    {
        country_code: "CH",
        legal_code: "PLVZ",
        description: "RENUNCIATION"
    },
    {
        country_code: "CH",
        legal_code: "PLZ",
        description: "PATENT OF ADDITION CEASED"
    },
    {
        country_code: "CH",
        legal_code: "PSI",
        description: "CHANGE OF HEADQUARTERS"
    },
    {
        country_code: "CH",
        legal_code: "PUE",
        description: "ASSIGNMENT"
    },
    {
        country_code: "CH",
        legal_code: "PUEA",
        description: "ASSIGNMENT OF THE SHARE"
    },
    {
        country_code: "CH",
        legal_code: "PVP",
        description: "PLEDGING"
    },
    {
        country_code: "CH",
        legal_code: "PVPA",
        description: "CANCELLATION OF PLEDGING"
    },
    {
        country_code: "CH",
        legal_code: "PW",
        description: "RESTITUTION"
    },
    {
        country_code: "CH",
        legal_code: "PWZ",
        description: "RESTITUTION OF A PATENT OF ADDITION"
    },
    {
        country_code: "CH",
        legal_code: "PZW",
        description: "REJECTION (PATENT)"
    },
    {
        country_code: "CH",
        legal_code: "PZZ",
        description: "WITHDRAWAL"
    },
    {
        country_code: "CH",
        legal_code: "SPCC",
        description: "CERTIFICATES - CORRECTIONS"
    },
    {
        country_code: "CH",
        legal_code: "SPCF",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE FILED"
    },
    {
        country_code: "CH",
        legal_code: "SPCG",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE GRANTED"
    },
    {
        country_code: "CH",
        legal_code: "SPCH",
        description: "REINSTATEMENT OF AN SPC"
    },
    {
        country_code: "CH",
        legal_code: "SPCL",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE DELETION"
    },
    {
        country_code: "CH",
        legal_code: "SPCM",
        description: "CERTIFICATES - MODIFICATION OF ASSIGNMENT"
    },
    {
        country_code: "CH",
        legal_code: "SPCN",
        description: "CERTIFICATES - MODIFICATION NEW REPRESENTATIVE"
    },
    {
        country_code: "CH",
        legal_code: "SPCO",
        description: "CERTIFICATES - MODIFICATION LICENSES"
    },
    {
        country_code: "CH",
        legal_code: "SPCP",
        description: "CERTIFICATES - MODIFICATION OF FIRM"
    },
    {
        country_code: "CH",
        legal_code: "SPCR",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE REJECTED"
    },
    {
        country_code: "CH",
        legal_code: "SPCU",
        description: "CERTIFICATE - PUBLICATION OF DECISION THAT COULD NOT BE NOTIFIED BY OTHER MEANS (I.E. GAZETTE)"
    },
    {
        country_code: "CH",
        legal_code: "SPCW",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE WITHDRAWN"
    },
    {
        country_code: "CH",
        legal_code: "TV",
        description: "PARTIAL RENUNCIATION"
    },
    {
        country_code: "CL",
        legal_code: "0006",
        description: "Change of type of right"
    },
    {
        country_code: "CL",
        legal_code: "0013",
        description: "Search report with recommendation of acceptation (concession)"
    },
    {
        country_code: "CL",
        legal_code: "0030",
        description: "Received in legal department (Opposition or void)"
    },
    {
        country_code: "CL",
        legal_code: "0047",
        description: "Beginning of substantive Examination"
    },
    {
        country_code: "CL",
        legal_code: "0052",
        description: "Court decision"
    },
    {
        country_code: "CL",
        legal_code: "0081",
        description: "Beginning of formal revision of application recommended for concession"
    },
    {
        country_code: "CL",
        legal_code: "0090",
        description: "Publication of pending application"
    },
    {
        country_code: "CL",
        legal_code: "0092",
        description: "Re-publication of pending application"
    },
    {
        country_code: "CL",
        legal_code: "0099",
        description: "Incorporation"
    },
    {
        country_code: "CL",
        legal_code: "0121",
        description: "Referred to arbitration court by administrative decision"
    },
    {
        country_code: "CL",
        legal_code: "0122",
        description: "Referred to arbitration court by court decision"
    },
    {
        country_code: "CL",
        legal_code: "0126",
        description: "Appeal rejected by administrative decision"
    },
    {
        country_code: "CL",
        legal_code: "0127",
        description: "Appeal rejected by court decision"
    },
    {
        country_code: "CL",
        legal_code: "0128",
        description: "Apeal accepted by administrative decision"
    },
    {
        country_code: "CL",
        legal_code: "0129",
        description: "Appeal accepted by court decision"
    },
    {
        country_code: "CL",
        legal_code: "0151",
        description: "Granted"
    },
    {
        country_code: "CL",
        legal_code: "0161",
        description: "Rejected"
    },
    {
        country_code: "CL",
        legal_code: "0162",
        description: "Withdrawn"
    },
    {
        country_code: "CL",
        legal_code: "0165",
        description: "Registration cancelled"
    },
    {
        country_code: "CL",
        legal_code: "0180",
        description: "Accreditation of payment of right of concession"
    },
    {
        country_code: "CL",
        legal_code: "0580",
        description: "Abandoned"
    },
    {
        country_code: "CN",
        legal_code: "ASS",
        description: "SUCCESSION OR ASSIGNMENT OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "BB1A",
        description: "PUBLICATION OF APPLICATION"
    },
    {
        country_code: "CN",
        legal_code: "C01",
        description: "DEEMED WITHDRAWAL OF PATENT APPLICATION (PATENT LAW 1993)"
    },
    {
        country_code: "CN",
        legal_code: "C02",
        description: "DEEMED WITHDRAWAL OF PATENT APPLICATION AFTER PUBLICATION (PATENT LAW 2001)"
    },
    {
        country_code: "CN",
        legal_code: "C03",
        description: "WITHDRAWAL OF PATENT APPLICATION (PATENT LAW 1993)"
    },
    {
        country_code: "CN",
        legal_code: "C04",
        description: "WITHDRAWAL OF PATENT APPLICATION AFTER PUBLICATION (PATENT LAW 2001)"
    },
    {
        country_code: "CN",
        legal_code: "C05",
        description: "DEEMED WITHDRAWAL (PATENT LAW BEFORE 1993)"
    },
    {
        country_code: "CN",
        legal_code: "C06",
        description: "PUBLICATION"
    },
    {
        country_code: "CN",
        legal_code: "C10",
        description: "REQUEST OF EXAMINATION AS TO SUBSTANCE"
    },
    {
        country_code: "CN",
        legal_code: "C12",
        description: "REJECTION OF AN APPLICATION FOR A PATENT"
    },
    {
        country_code: "CN",
        legal_code: "C13",
        description: "DECISION"
    },
    {
        country_code: "CN",
        legal_code: "C14",
        description: "GRANTED"
    },
    {
        country_code: "CN",
        legal_code: "C15",
        description: "EXTENSION OF PATENT RIGHT DURATION (FROM 15 TO 20 YEARS)"
    },
    {
        country_code: "CN",
        legal_code: "C17",
        description: "CESSATION OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C19",
        description: "LAPSE OF PATENT RIGHT DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "CN",
        legal_code: "C20",
        description: "PATENT RIGHT DEEMED TO BE ABANDONED"
    },
    {
        country_code: "CN",
        legal_code: "C25",
        description: "OTHER RELATED MATTERS (WITHDRAWAL OF PATENT RIGHT TO AVOID RE-GRANTED)"
    },
    {
        country_code: "CN",
        legal_code: "C26",
        description: "REVOCATION OF PART OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C28",
        description: "REVOCATION OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C32",
        description: "PART INVALIDATION OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C35",
        description: "INVALIDATION OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C41",
        description: "TRANSFER OF THE RIGHT OF PATENT APPLICATION OR THE PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C44",
        description: "SUCCESSION OR ASSIGNMENT OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C45",
        description: "ASSIGNMENT OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C47",
        description: "SUCCESSION OR ASSIGNMENT OF PATENT RIGHT (SUCCESSION OF PATENT RIGHT)"
    },
    {
        country_code: "CN",
        legal_code: "C49",
        description: "RESTORATION OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "C52",
        description: "RESTORATION OF THE PATENT APPLICATION OR PATENT RIGHT (RESTORATION OF THE PATENT APPLICATION)"
    },
    {
        country_code: "CN",
        legal_code: "C53",
        description: "CHANGE OR MODIFICATION"
    },
    {
        country_code: "CN",
        legal_code: "C56",
        description: "CHANGE IN THE NAME OR ADDRESS OF THE PATENTEE"
    },
    {
        country_code: "CN",
        legal_code: "C57",
        description: "NOTIFICATION OF UNCLEAR OR UNKNOWN ADDRESS"
    },
    {
        country_code: "CN",
        legal_code: "C59",
        description: "NOTIFICATION"
    },
    {
        country_code: "CN",
        legal_code: "C60",
        description: "OTHER RELATED MATTERS"
    },
    {
        country_code: "CN",
        legal_code: "C61",
        description: "OTHER RELATED MATTERS MISSED ANNOUNCEMENT TO GRANT THE PATENT RIGHT OF FOLLOWING PATENT APPLICATION ON SEPTEMBER 13, 1989"
    },
    {
        country_code: "CN",
        legal_code: "C62",
        description: "OTHER RELATED MATTERS (REQUEST FOR RESUMING PROCEDURE)"
    },
    {
        country_code: "CN",
        legal_code: "COR",
        description: "BIBLIOGRAPHIC CHANGE OR CORRECTION IN THE DESCRIPTION"
    },
    {
        country_code: "CN",
        legal_code: "ERR",
        description: "GAZETTE CORRECTION"
    },
    {
        country_code: "CN",
        legal_code: "FG1K",
        description: "GRANT OF UTILITY MODEL"
    },
    {
        country_code: "CN",
        legal_code: "FG4A",
        description: "GRANT OF PATENT"
    },
    {
        country_code: "CN",
        legal_code: "GRSP",
        description: "GRANT OF SECRET PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "LIC",
        description: "PATENT LICENSE CONTRACT FOR EXPLOITATION SUBMITTED FOR RECORD"
    },
    {
        country_code: "CN",
        legal_code: "LICC",
        description: "ENFORCEMENT, CHANGE AND CANCELLATION OF RECORD OF CONTRACTS ON THE LICENSE FOR EXPLOITATION OF A PATENT"
    },
    {
        country_code: "CN",
        legal_code: "MA1K",
        description: "DEEMED AS ABANDONED"
    },
    {
        country_code: "CN",
        legal_code: "MK1K",
        description: "EXPIRATION OF UTILITY MODEL"
    },
    {
        country_code: "CN",
        legal_code: "MK4A",
        description: "EXPIRATION OF PATENT"
    },
    {
        country_code: "CN",
        legal_code: "MM1K",
        description: "CEASE CAUSED BY UNPAYMENT OF ANNUAL FEE"
    },
    {
        country_code: "CN",
        legal_code: "MM4A",
        description: "CEASE OF PATENT RIGHT CAUSED BY UNPAYMENT OF ANNUAL FEE"
    },
    {
        country_code: "CN",
        legal_code: "PLDC",
        description: "ENFORCEMENT, CHANGE AND CANCELLATION OF CONTRACTS ON PLEDGE OF PATENT RIGHT"
    },
    {
        country_code: "CN",
        legal_code: "RECT",
        description: "RECTIFICATION"
    },
    {
        country_code: "CN",
        legal_code: "REG",
        description: "REFERENCE TO A NATIONAL CODE"
    },
    {
        country_code: "CN",
        legal_code: "REPR",
        description: "NEW REPRESENTATIVE"
    },
    {
        country_code: "CN",
        legal_code: "RGAV",
        description: "ABANDON PATENT RIGHT TO AVOID REGRANT"
    },
    {
        country_code: "CN",
        legal_code: "RINS",
        description: "SAVE FROM DAMAGE AND RELIEVE OF PATENT RIGHT"
    },
    {
        country_code: "CO",
        legal_code: "FA",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "CO",
        legal_code: "FC",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "CO",
        legal_code: "FD",
        description: "APPLICATION LAPSED"
    },
    {
        country_code: "CO",
        legal_code: "FG",
        description: "APPLICATION GRANTED"
    },
    {
        country_code: "Costa",
        legal_code: "Rica",
        description: ""
    },
    {
        country_code: "CR",
        legal_code: "FA",
        description: "ABANDONMENT OR WITHDRAWAL (GRANTING PROCEDURE)"
    },
    {
        country_code: "CR",
        legal_code: "FC",
        description: "REFUSAL"
    },
    {
        country_code: "CR",
        legal_code: "FC90",
        description: "SUSPENSION OF GRANTING PROCEDURE"
    },
    {
        country_code: "CR",
        legal_code: "FD",
        description: "APPLICATION DECLARED VOID OR LAPSED"
    },
    {
        country_code: "CR",
        legal_code: "MA",
        description: "ABANDONMENT OR WITHDRAWAL (DISCONTINUATION OF RIGHT)"
    },
    {
        country_code: "CR",
        legal_code: "MC",
        description: "ANNULMENT"
    },
    {
        country_code: "CR",
        legal_code: "MK",
        description: "EXPIRY"
    },
    {
        country_code: "CS",
        legal_code: "IF00",
        description: "IN FORCE AS OF 2000-06-30 IN CZECH REPUBLIC"
    },
    {
        country_code: "CS",
        legal_code: "MC4A",
        description: "PATENT REVOCATION (ANNULMENT)"
    },
    {
        country_code: "CS",
        legal_code: "MK4A",
        description: "EXPIRATION OF PATENT"
    },
    {
        country_code: "CS",
        legal_code: "MM4A",
        description: "LAPSE OF PATENT DUE TO FAILURE OF PAYMENT OF FEES"
    },
    {
        country_code: "CS",
        legal_code: "PD00",
        description: "PENDING AS OF 2000-06-30 IN CZECH REPUBLIC"
    },
    {
        country_code: "CU",
        legal_code: "FD",
        description: "LAPSE (FOR NOT PAYING FEES)"
    },
    {
        country_code: "CU",
        legal_code: "FG",
        description: "GRANT OF PATENT"
    },
    {
        country_code: "CU",
        legal_code: "MK",
        description: "EXPIRY"
    },
    {
        country_code: "Czech",
        legal_code: "Republic",
        description: ""
    },
    {
        country_code: "CZ",
        legal_code: "FG1K",
        description: "Registered utility model"
    },
    {
        country_code: "CZ",
        legal_code: "IF00",
        description: "In force as of 2000-06-30"
    },
    {
        country_code: "CZ",
        legal_code: "MA4A",
        description: "Lapse of patent due to relinguishment"
    },
    {
        country_code: "CZ",
        legal_code: "MC3K",
        description: "Revocation of utility model"
    },
    {
        country_code: "CZ",
        legal_code: "MC4A",
        description: "Patent revocation (annulment)"
    },
    {
        country_code: "CZ",
        legal_code: "MH1K",
        description: "LAPSE OF UTILITY MODEL DUE TO RELINGUISHMENT"
    },
    {
        country_code: "CZ",
        legal_code: "MK1K",
        description: "Lapse of utility model due to expiry"
    },
    {
        country_code: "CZ",
        legal_code: "MK4A",
        description: "Lapse of patent on expiry"
    },
    {
        country_code: "CZ",
        legal_code: "MM4A",
        description: "Lapse of patent due to failure of payment of fees"
    },
    {
        country_code: "CZ",
        legal_code: "ND1K",
        description: "First extension of term of utility model"
    },
    {
        country_code: "CZ",
        legal_code: "PD00",
        description: "PENDING AS OF 2000-06-30"
    },
    {
        country_code: "German",
        legal_code: "Democratic",
        description: "Republic"
    },
    {
        country_code: "DD",
        legal_code: "A1",
        description: "PUBLISHED AS PROV. ECONOMIC PATENT"
    },
    {
        country_code: "DD",
        legal_code: "A2",
        description: "PUBLISHED AS PROV. ECONOMIC PATENT (ADDITIONAL PATENT)"
    },
    {
        country_code: "DD",
        legal_code: "A3",
        description: "PUBLISHED AS ECONOMIC PATENT"
    },
    {
        country_code: "DD",
        legal_code: "A5",
        description: "PUBLISHED AS PROV. EXCLUSIVE PATENT"
    },
    {
        country_code: "DD",
        legal_code: "A7",
        description: "PUBLISHED AS EXCLUSIVE PATENT"
    },
    {
        country_code: "DD",
        legal_code: "A9",
        description: "LAID OPEN APPLICATION ACCORD. TO PAR. 10.3 EXTENSION ACT"
    },
    {
        country_code: "DD",
        legal_code: "ASS",
        description: "CHANGE OF APPLICANT OR OWNER"
    },
    {
        country_code: "DD",
        legal_code: "AUF",
        description: "MAINTAINED (SECT. 12/3 EXTENSION ACT"
    },
    {
        country_code: "DD",
        legal_code: "B1",
        description: "ECONOMIC PATENT (SECT. 18(1))"
    },
    {
        country_code: "DD",
        legal_code: "B3",
        description: "EXCLUSIVE PATENT (SECT. 18(1))"
    },
    {
        country_code: "DD",
        legal_code: "B5",
        description: "PATENT SPECIFICATION, 2ND PUBL. ACCORD. TO EXTENSION ACT"
    },
    {
        country_code: "DD",
        legal_code: "BAB",
        description: "TRANSLATION PUBLISHED SECTION 8/1 EXTENSION ACT"
    },
    {
        country_code: "DD",
        legal_code: "BAUF",
        description: "MAINTAINED RESTRICTED (SECT. 12/3 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "BER",
        description: "CORRECTION/AMENDMENT"
    },
    {
        country_code: "DD",
        legal_code: "C",
        description: "PROV. EXCLUSIVE PATENT (SECT. 19)"
    },
    {
        country_code: "DD",
        legal_code: "C2",
        description: "ECONOMIC PATENT (SECT. 19)"
    },
    {
        country_code: "DD",
        legal_code: "C4",
        description: "EXCLUSIVE PATENT (SECT. 19)"
    },
    {
        country_code: "DD",
        legal_code: "C5",
        description: "PATENT SPECIFICATION, 3RD PUBL. ACCORD. TO EXTENSION ACT"
    },
    {
        country_code: "DD",
        legal_code: "D1",
        description: "PATENT MODIFIED AFTER THE RESTRICTION PROCEEDINGS"
    },
    {
        country_code: "DD",
        legal_code: "DEAE",
        description: "KEPT VALID AFTER OPPOSITION PROCEEDINGS"
    },
    {
        country_code: "DD",
        legal_code: "E491",
        description: "GRANTED (SECT. 49/1 PATENT ACT"
    },
    {
        country_code: "DD",
        legal_code: "EEPE",
        description: "EXTENDED PATENT HAS CEASED"
    },
    {
        country_code: "DD",
        legal_code: "EN",
        description: "WITHDRAWN (ART. 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "ENJ",
        description: "CEASED DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "DD",
        legal_code: "EP",
        description: "REQUEST FOR EXAMINATION UNDER PARAGRAPH 12(1) FILED"
    },
    {
        country_code: "DD",
        legal_code: "EPAA",
        description: "CHANGE IN THE PERSON, NAME OR ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DD",
        legal_code: "EPAE",
        description: "CHANGE IN THE PERSON, NAME OR ADDRESS OF THE PATENTEE"
    },
    {
        country_code: "DD",
        legal_code: "EPAV",
        description: "CHANGE IN THE PERSON, NAME OR ADDRESS OF THE REPRESENTATIVE"
    },
    {
        country_code: "DD",
        legal_code: "EPBP",
        description: "SEARCH REPORT REQUESTED"
    },
    {
        country_code: "DD",
        legal_code: "EPE",
        description: "EXTENDED PATENT HAS CEASED"
    },
    {
        country_code: "DD",
        legal_code: "EZ",
        description: "ACTION FOR VOID DECLARATION WITHDRAWN"
    },
    {
        country_code: "DD",
        legal_code: "IF04",
        description: "IN FORCE IN THE YEAR 2004"
    },
    {
        country_code: "DD",
        legal_code: "KR",
        description: "PATENT APPLICATION ERRONEOUSLY CONTAINED IN THE LISTS OF 92-05-07"
    },
    {
        country_code: "DD",
        legal_code: "LA",
        description: "REQUEST FOR RESTRICTION FILED (PARAGRAPH 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "LF",
        description: "PATENT MODIFIED IN RESTRICTION PROCEEDINGS (PARAGRAPH 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "LG",
        description: "ELIMINATION OR DIVISION OF APPLICATION"
    },
    {
        country_code: "DD",
        legal_code: "LZH",
        description: "CANCELLED DUE TO EXPIRATION OF THE MAIN PATENT"
    },
    {
        country_code: "DD",
        legal_code: "MD11",
        description: "NOTIFICATION CONCERNING SPECIFICATIONS RETRIEVED UNDER SECT. 11"
    },
    {
        country_code: "DD",
        legal_code: "NAA",
        description: "PUBLIC NOTICE FOR INSPECTION OF PATENT APPLICATION"
    },
    {
        country_code: "DD",
        legal_code: "NAB",
        description: "PUBLIC NOTICE FOR INSPECTION OF PROVISIONAL EXCLUSIVE PATENT ACCORD. TO PAR 17/1 DD-PATG."
    },
    {
        country_code: "DD",
        legal_code: "NAC",
        description: "PUBLIC NOTICE FOR INSPECTION OF PROVISIONAL EXCLUSIVE PATENT ACCORD. TO PAR 18/2 DD-PATG."
    },
    {
        country_code: "DD",
        legal_code: "NAH",
        description: "PUBLIC NOTICE FOR INSPECTION OF FOREIGN-LANGUAGE PATENT APPLICATIONS (HAVANNA TREATY)"
    },
    {
        country_code: "DD",
        legal_code: "ND",
        description: "REPRINT"
    },
    {
        country_code: "DD",
        legal_code: "NPE",
        description: "GRANTED AFTER EXAMINATION OF ALL PROTECTION PREREQUISITES"
    },
    {
        country_code: "DD",
        legal_code: "NPI",
        description: "CHANGE IN THE PERSON, NAME OR ADDRESS OF THE PATENTEE (ADDENDUM TO CHANGES BEFORE EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "NPV",
        description: "CHANGE IN THE PERSON, THE NAME OR THE ADDRESS OF THE REPRESENTATIVE (ADDENDUM TO CHANGES BEFORE EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "NZJ",
        description: "NON PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DD",
        legal_code: "O103",
        description: "LAID OPEN (SECT. 10/3 PATENT ACT"
    },
    {
        country_code: "DD",
        legal_code: "OAP",
        description: "REQUEST FOR EXAMINATION ACCORDING TO ARTICLE 10 PARAGRAPH 4"
    },
    {
        country_code: "DD",
        legal_code: "OPEP",
        description: "REQUEST FOR EXAMINATION UNDER PARAGRAPH 44 FILED"
    },
    {
        country_code: "DD",
        legal_code: "PJ",
        description: "CEASED DUE TO NON-PAYMENT OF RENEWAL FEE (ADDENDUM TO CHANGES BEFORE EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "PL23",
        description: "WILLINGNESS TO GRANT LICENSES DECLARED"
    },
    {
        country_code: "DD",
        legal_code: "PLW7",
        description: "WILLINGNESS TO GRANT LICENSES REVOKED"
    },
    {
        country_code: "DD",
        legal_code: "PNE",
        description: "DECLARED VOID"
    },
    {
        country_code: "DD",
        legal_code: "PP18",
        description: "AS RESULT AN EXAMINATION UNDER PAR. 18(1) FULLY CANCELLED"
    },
    {
        country_code: "DD",
        legal_code: "PTE",
        description: "PARTIALLY DECLARED VOID"
    },
    {
        country_code: "DD",
        legal_code: "PV",
        description: "PATENT DISCLAIMER (ADDENDUM TO CHANGES BEFORE EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "PVB",
        description: "PATENT FULLY VALIDATED"
    },
    {
        country_code: "DD",
        legal_code: "QD",
        description: "EXCLUSIVE USE ACCORD. TO PARAGR. 34(1) - EXTENDED PATENTS"
    },
    {
        country_code: "DD",
        legal_code: "RAW",
        description: "RECONVERSION OF EXCLUSIVE PATENT INTO ECONOMIC PATENT"
    },
    {
        country_code: "DD",
        legal_code: "RNU",
        description: "LEGAL SUCCESSOR OF THE FORMER COMPANY"
    },
    {
        country_code: "DD",
        legal_code: "RPEP",
        description: "SEARCH AND EXAMINATION OF AN EXTENDED PATENT"
    },
    {
        country_code: "DD",
        legal_code: "RPI",
        description: "CHANGE IN THE PERSON, NAME OR ADDRESS OF THE PATENTEE (SEARCHES ACCORDING TO ART. 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "RPV",
        description: "CHANGE IN THE PERSON, THE NAME OR THE ADDRESS OF THE REPRESENTATIVE (SEARCHES ACCORDING TO ART. 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "TWB",
        description: "PARTIAL CONFIRMED, A MODIFIED SPECIFICATION IS ISSUED"
    },
    {
        country_code: "DD",
        legal_code: "UP",
        description: "INEFFECTIVENESS OF EXAMINATION REQUESTS"
    },
    {
        country_code: "DD",
        legal_code: "UW",
        description: "CONVERSION OF ECONOMIC PATENT INTO EXCLUSIVE PATENT"
    },
    {
        country_code: "DD",
        legal_code: "UWD",
        description: "CONVERSION OF ECONOMIC PATENT INTO EXCLUSIVE PATENT ** INOPERATIVE"
    },
    {
        country_code: "DD",
        legal_code: "VE",
        description: "OPPOSITION AGAINST PATENT RAISED"
    },
    {
        country_code: "DD",
        legal_code: "VEU",
        description: "OPPOSITION AGAINST PATENT IRRECEIVABLE"
    },
    {
        country_code: "DD",
        legal_code: "VZ",
        description: "DISCLAIMER OF PATENT (ART. 11 AND 12 EXTENSION ACT)"
    },
    {
        country_code: "DD",
        legal_code: "WEVS",
        description: "RESTITUTION INTO PRIOR STATUS"
    },
    {
        country_code: "DD",
        legal_code: "WP12",
        description: "AS RESULT OF EXAMINATION UNDER PARAGRAPH 12 ERSTRG. PATENT REVOKED"
    },
    {
        country_code: "DD",
        legal_code: "WP59",
        description: "PATENT REVOKED AFTER OPPOSITION UNDER PARAGRAPH 59 PATG."
    },
    {
        country_code: "DD",
        legal_code: "WVSA",
        description: "RESTITUTION INTO PRIOR STATUS DUE TO DEMAND"
    },
    {
        country_code: "DD",
        legal_code: "ZN",
        description: "WITHDRAWN"
    },
    {
        country_code: "DD",
        legal_code: "ZNAA",
        description: "WITHDRAWAL OF APPLICATION WITHOUT REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DD",
        legal_code: "ZNAB",
        description: "WITHDRAWAL OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 17/1"
    },
    {
        country_code: "DD",
        legal_code: "ZNAC",
        description: "WITHDRAWAL OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 18/2"
    },
    {
        country_code: "DD",
        legal_code: "ZNAH",
        description: "WITHDRAWAL OF APPLICATION UNDER HAVANNA AGREEMENT"
    },
    {
        country_code: "DD",
        legal_code: "ZPFA",
        description: "FILING OF CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "DD",
        legal_code: "ZTFA",
        description: "FILING OF CERTIFICATE"
    },
    {
        country_code: "DD",
        legal_code: "ZW",
        description: "REJECTED"
    },
    {
        country_code: "DD",
        legal_code: "ZWAA",
        description: "REJECTION OF APPLICATION WITHOUT REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DD",
        legal_code: "ZWAB",
        description: "REJECTION OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 17/1"
    },
    {
        country_code: "DD",
        legal_code: "ZWAC",
        description: "REJECTION OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 18/2"
    },
    {
        country_code: "DD",
        legal_code: "ZWAH",
        description: "REJECTION OF APPLICATION UNDER HAVANNA AGREEMENT"
    },
    {
        country_code: "DD",
        legal_code: "ZZAA",
        description: "WITHDRAWAL OF APPLICATION WITHOUT REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DD",
        legal_code: "ZZAB",
        description: "WITHDRAWAL OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 17/1"
    },
    {
        country_code: "DD",
        legal_code: "ZZAC",
        description: "WITHDRAWAL OF APPLICATION WITH REQEST FOR EXAMINATION UNDER PAR. 18/2"
    },
    {
        country_code: "DD",
        legal_code: "ZZAH",
        description: "WITHDRAWAL OF APPLICATION UNDER HAVANNA AGREEMENT"
    },
    {
        country_code: "DE",
        legal_code: "5AU",
        description: "NEW APPLICATION NO. (PART 5 OF THE PATENT GAZETTE)"
    },
    {
        country_code: "DE",
        legal_code: "8000",
        description: "PCT-APPLICATION DESIGNATING DE"
    },
    {
        country_code: "DE",
        legal_code: "8100",
        description: "PUBLICATION OF THE EXAMINED APPLICATION WITHOUT PUBLICATION OF UNEXAMINED APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "8101",
        description: "REQUEST FOR EXAMINATION AS TO NOVELTY"
    },
    {
        country_code: "DE",
        legal_code: "8102",
        description: "REQUEST FOR EXAMINATION AS TO NOVELTY (FOR EP)"
    },
    {
        country_code: "DE",
        legal_code: "8105",
        description: "SEARCH REPORT AVAILABLE"
    },
    {
        country_code: "DE",
        legal_code: "8106",
        description: "SEARCH REPORT AVAILABLE (FOR EP)"
    },
    {
        country_code: "DE",
        legal_code: "8107",
        description: "ANNOUNCEMENT OF SEARCH RESULTS AFTER PUBLICATION OF PATENT DOCUMENT"
    },
    {
        country_code: "DE",
        legal_code: "8110",
        description: "REQUEST FOR EXAMINATION PARAGRAPH 44"
    },
    {
        country_code: "DE",
        legal_code: "8115",
        description: "REQUEST FOR EXAMINATION VOID"
    },
    {
        country_code: "DE",
        legal_code: "8120",
        description: "WILLINGNESS TO GRANT LICENSES PARAGRAPH 23"
    },
    {
        country_code: "DE",
        legal_code: "8121",
        description: "WILLINGNESS TO GRANT LICENSES PARAGRAPH 23 WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8122",
        description: "NONBINDING INTEREST IN GRANTING LICENSES DECLARED"
    },
    {
        country_code: "DE",
        legal_code: "8123",
        description: "NONBINDING INTEREST IN GRANTING LICENSES WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8125",
        description: "CHANGE OF THE MAIN CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8126",
        description: "CHANGE OF THE SECONDARY CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8127",
        description: "NEW PERSON/NAME/ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DE",
        legal_code: "8128",
        description: "NEW PERSON/NAME/ADDRESS OF THE AGENT"
    },
    {
        country_code: "DE",
        legal_code: "8129",
        description: "CHANGE IN THE PRIORITY TABLE"
    },
    {
        country_code: "DE",
        legal_code: "8130",
        description: "WITHDRAWAL"
    },
    {
        country_code: "DE",
        legal_code: "8131",
        description: "REJECTION"
    },
    {
        country_code: "DE",
        legal_code: "8133",
        description: "DISPOSAL/NON-PAYMENT OF THE APPLICATION FEE"
    },
    {
        country_code: "DE",
        legal_code: "8136",
        description: "DISPOSAL/NON-PAYMENT OF THE FEE FOR PUBLICATION/GRANT"
    },
    {
        country_code: "DE",
        legal_code: "8139",
        description: "DISPOSAL/NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "8140",
        description: "DISPOSAL/NON-PAYMENT OF THE ANNUAL FEE FOR MAIN APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "8141",
        description: "DISPOSAL/NO REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DE",
        legal_code: "8142",
        description: "DECLARATION FOR PARTITION TO BE CONSIDERED AS NOT GIVEN AS TO PARAGRAPH 39 OR 60"
    },
    {
        country_code: "DE",
        legal_code: "8143",
        description: "WITHDRAWN DUE TO CLAIMING INTERNAL PRIORITY"
    },
    {
        country_code: "DE",
        legal_code: "8161",
        description: "APPLICATION OF ADDITION TO:"
    },
    {
        country_code: "DE",
        legal_code: "8162",
        description: "INDEPENDENT APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "8165",
        description: "UNEXAMINED PUBLICATION OF FOLLOWING APPLICATION REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8166",
        description: "UNEXAMINED PUBLICATION OF FOLLOWING INTERNATIONAL APPLICATION IN GERMAN LANGUAGE REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8167",
        description: "PUBLICATION OF TRANSLATION OF INTERNATIONAL APPLICATION WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8170",
        description: "REINSTATEMENT OF THE FORMER POSITION"
    },
    {
        country_code: "DE",
        legal_code: "8172",
        description: "SUPPLEMENTARY DIVISION/PARTITION IN:"
    },
    {
        country_code: "DE",
        legal_code: "8176",
        description: "PROCEEDINGS SUSPENDED BECAUSE OF APPLICATION NO:"
    },
    {
        country_code: "DE",
        legal_code: "8178",
        description: "SUSPENSION CANCELLED"
    },
    {
        country_code: "DE",
        legal_code: "8180",
        description: "MISCELLANEOUS PART 1"
    },
    {
        country_code: "DE",
        legal_code: "8181",
        description: "INVENTOR (NEW SITUATION)"
    },
    {
        country_code: "DE",
        legal_code: "8196",
        description: "REPRINT PF FAULTY TITLE PAGE (PUBLICATION); GERMAN PATENTBLATT: PART 1A6"
    },
    {
        country_code: "DE",
        legal_code: "8197",
        description: "REPRINT OF AN ERRONEOUS PATENT DOCUMENT"
    },
    {
        country_code: "DE",
        legal_code: "8207",
        description: "ANNOUNCEMENT OF SEARCH RESULTS AFTER PUBLICATION OF THE PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8220",
        description: "WILLINGNESS TO GRANT LICENSES (PARAGRAPH 23)"
    },
    {
        country_code: "DE",
        legal_code: "8221",
        description: "WILLINGNESS TO GRANT LICENSES PARAGRAPH 23 WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8222",
        description: "NONBINDING INTEREST IN GRANTING LICENSES DECLARED"
    },
    {
        country_code: "DE",
        legal_code: "8223",
        description: "NONBINDING INTEREST IN GRANTING LICENSES WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8225",
        description: "CHANGE OF THE MAIN CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8226",
        description: "CHANGE OF THE SECONDARY CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8227",
        description: "NEW PERSON/NAME/ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DE",
        legal_code: "8228",
        description: "NEW AGENT"
    },
    {
        country_code: "DE",
        legal_code: "8229",
        description: "CHANGE IN THE PRIORITY TABLE"
    },
    {
        country_code: "DE",
        legal_code: "8230",
        description: "PATENT WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8231",
        description: "PATENT REJECTED"
    },
    {
        country_code: "DE",
        legal_code: "8235",
        description: "PATENT REFUSED"
    },
    {
        country_code: "DE",
        legal_code: "8238",
        description: "DISPOSAL/NON-PAYMENT OF THE APPLICATION FEE"
    },
    {
        country_code: "DE",
        legal_code: "8239",
        description: "DISPOSAL/NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "8240",
        description: "DISPOSAL/NON-PAYMENT OF ANNUAL FEE FOR MAIN APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "8243",
        description: "SETTLED DUE TO CLAIMING INTERNAL PRIORITY"
    },
    {
        country_code: "DE",
        legal_code: "8261",
        description: "APPLICATION OF ADDITION TO:"
    },
    {
        country_code: "DE",
        legal_code: "8262",
        description: "APPLICATION BECAME INDEPENDENT"
    },
    {
        country_code: "DE",
        legal_code: "8263",
        description: "OPPOSITION AGAINST GRANT OF A PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8265",
        description: "PUBLICATION OF THE EXAMINED APPLICATION REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8270",
        description: "REINSTATEMENT OF THE FORMER POSITION"
    },
    {
        country_code: "DE",
        legal_code: "8272",
        description: "DIVISIONAL INVENTIVE UNIT IN:"
    },
    {
        country_code: "DE",
        legal_code: "8276",
        description: "PROCEEDINGS SUSPENDED BECAUSE OF APPLICATION NO:"
    },
    {
        country_code: "DE",
        legal_code: "8278",
        description: "SUSPENSION CANCELLED"
    },
    {
        country_code: "DE",
        legal_code: "8280",
        description: "MISCELLANEOUS PART II"
    },
    {
        country_code: "DE",
        legal_code: "8281",
        description: "INVENTOR (NEW SITUATION)"
    },
    {
        country_code: "DE",
        legal_code: "8304",
        description: "GRANT AFTER EXAMINATION PROCEDURE"
    },
    {
        country_code: "DE",
        legal_code: "8305",
        description: "RESTRICTED MAINTENANCE OF PATENT AFTER OPPOSITION"
    },
    {
        country_code: "DE",
        legal_code: "8306",
        description: "PATENT MODIFIED IN THE RESTRICTION PROCEEDINGS (REPRINTED)"
    },
    {
        country_code: "DE",
        legal_code: "8307",
        description: "GRANT AFTER TERM FOR OPPOSITION"
    },
    {
        country_code: "DE",
        legal_code: "8308",
        description: "OTHER GRANTED PATENTS"
    },
    {
        country_code: "DE",
        legal_code: "8309",
        description: "EP-PATENT VALID IN DE"
    },
    {
        country_code: "DE",
        legal_code: "8310",
        description: "ACTION FOR DECLARATION OF ANNULMENT"
    },
    {
        country_code: "DE",
        legal_code: "8311",
        description: "COMPLETE INVALIDATION"
    },
    {
        country_code: "DE",
        legal_code: "8312",
        description: "PARTIAL INVALIDATION"
    },
    {
        country_code: "DE",
        legal_code: "8313",
        description: "REQUEST FOR INVALIDATION REJECTED/WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8314",
        description: "INVALIDATION REJECTED"
    },
    {
        country_code: "DE",
        legal_code: "8315",
        description: "REQUEST FOR RESTRICTION FILED"
    },
    {
        country_code: "DE",
        legal_code: "8316",
        description: "REQUEST FOR RESTRICTION WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8317",
        description: "REQUEST FOR RESTRICTION FINALLY REFUSED"
    },
    {
        country_code: "DE",
        legal_code: "8318",
        description: "PATENT RESTRICTED"
    },
    {
        country_code: "DE",
        legal_code: "8319",
        description: "ANNOUNCEMENT OF SEARCH RESULTS AFTER PUBLICATION OF THE GRANT"
    },
    {
        country_code: "DE",
        legal_code: "8320",
        description: "WILLINGNESS TO GRANT LICENSES DECLARED (PARAGRAPH 23)"
    },
    {
        country_code: "DE",
        legal_code: "8321",
        description: "WILLINGNESS TO GRANT LICENSES PARAGRAPH 23 WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8322",
        description: "NONBINDING INTEREST IN GRANTING LICENSES DECLARED"
    },
    {
        country_code: "DE",
        legal_code: "8323",
        description: "NONBINDING INTEREST IN GRANTING LICENSES WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8324",
        description: "APPLICATION FOR PATENT LIMITATION IS WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8325",
        description: "CHANGE OF THE MAIN CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8326",
        description: "CHANGE OF THE SECONDARY CLASSIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8327",
        description: "CHANGE IN THE PERSON/NAME/ADDRESS OF THE PATENT OWNER"
    },
    {
        country_code: "DE",
        legal_code: "8328",
        description: "CHANGE IN THE PERSON/NAME/ADDRESS OF THE AGENT"
    },
    {
        country_code: "DE",
        legal_code: "8329",
        description: "CHANGE IN THE PRIORITY TABLE"
    },
    {
        country_code: "DE",
        legal_code: "8330",
        description: "COMPLETE DISCLAIMER"
    },
    {
        country_code: "DE",
        legal_code: "8331",
        description: "COMPLETE REVOCATION"
    },
    {
        country_code: "DE",
        legal_code: "8332",
        description: "NO LEGAL EFFECT FOR DE"
    },
    {
        country_code: "DE",
        legal_code: "8333",
        description: "APPLICATION OF REVOCATION"
    },
    {
        country_code: "DE",
        legal_code: "8337",
        description: "APPLICATION OF REVOCATION OF THE PATENT IS WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8338",
        description: "APPLICATION FOR PATENT LIMITATION REJECTED BY BPATG"
    },
    {
        country_code: "DE",
        legal_code: "8339",
        description: "CEASED/NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "8340",
        description: "PATENT OF ADDITION CEASED/NON-PAYMENT OF FEE OF MAIN PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8341",
        description: "PATENT CHANGED BY BPATG DURING LIMITATION PROCEDURE"
    },
    {
        country_code: "DE",
        legal_code: "8350",
        description: "CEASED/NON-PAYMENT OF APPLICATION FEE"
    },
    {
        country_code: "DE",
        legal_code: "8360",
        description: "CEASED/INVENTOR NOT NAMED"
    },
    {
        country_code: "DE",
        legal_code: "8361",
        description: "NOTIFICATION OF GRANT REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8362",
        description: "RIGHTS OF MAIN PATENT TRANSFERRED TO ADDITIONAL PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8363",
        description: "OPPOSITION AGAINST THE PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8364",
        description: "NO OPPOSITION DURING TERM OF OPPOSITION"
    },
    {
        country_code: "DE",
        legal_code: "8365",
        description: "FULLY VALID AFTER OPPOSITION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "8366",
        description: "RESTRICTED MAINTAINED AFTER OPPOSITION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "8367",
        description: "PARTIAL DISCLAIMER OF THE PATENT"
    },
    {
        country_code: "DE",
        legal_code: "8368",
        description: "OPPOSITION REFUSED DUE TO INADMISSIBILITY"
    },
    {
        country_code: "DE",
        legal_code: "8369",
        description: "PARTITION IN:"
    },
    {
        country_code: "DE",
        legal_code: "8370",
        description: "INDICATION OF LAPSE OF PATENT IS TO BE DELETED"
    },
    {
        country_code: "DE",
        legal_code: "8371",
        description: "FEE RETURNED AS TO PARAGRAPH 18 LIT. 2 PATENT LAW"
    },
    {
        country_code: "DE",
        legal_code: "8372",
        description: "PUBLICATION OF EP PATENT WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8376",
        description: "CORRECTED TRANSLATION (CHANGED DURING OPPOSITION PROCEDURE) ARRIVED AND HAS BEEN PUBLISHED"
    },
    {
        country_code: "DE",
        legal_code: "8377",
        description: "SUSPENSION"
    },
    {
        country_code: "DE",
        legal_code: "8378",
        description: "INSTRUCTION FOR SUSPENSION HAS BEEN QUASHED"
    },
    {
        country_code: "DE",
        legal_code: "8380",
        description: "MISCELLANEOUS PART III"
    },
    {
        country_code: "DE",
        legal_code: "8381",
        description: "INVENTOR (NEW SITUATION)"
    },
    {
        country_code: "DE",
        legal_code: "8392",
        description: "PUBLICATION OF CHANGED PATENT SPECIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "8393",
        description: "PATENT CHANGED DURING THE LIMITATION PROCEDURE (CHANGED PATENT SPECIFICATION REPRINTED)"
    },
    {
        country_code: "DE",
        legal_code: "8394",
        description: "PATENT CHANGED DURING THE NULLIFICATION PROCEDURE (CHANGED PATENT SPECIFICATION REPRINTED)"
    },
    {
        country_code: "DE",
        legal_code: "8396",
        description: "REPRINT OF ERRONEOUS FRONT PAGE"
    },
    {
        country_code: "DE",
        legal_code: "8397",
        description: "REPRINT OF ERRONEOUS PATENT DOCUMENT"
    },
    {
        country_code: "DE",
        legal_code: "8505",
        description: "EP PATENT AMENDED AFTER LIMITATION PROCEEDINGS AT EPO"
    },
    {
        country_code: "DE",
        legal_code: "8506",
        description: "EP PATENT REVOKED BY EPO ON REQUEST"
    },
    {
        country_code: "DE",
        legal_code: "8509",
        description: "EP-PATENT VALID IN DE"
    },
    {
        country_code: "DE",
        legal_code: "8510",
        description: "DISPOSAL/WITHOUT GRANT"
    },
    {
        country_code: "DE",
        legal_code: "8564",
        description: "PUBLICATION OF EP-APPLICATION HAS BEEN REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8565",
        description: "PUBLICATION OF TRANSLATION OF CLAIMS OF EP-APPLICATION REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8566",
        description: "DESIGNATED COUNTRY DE NOT LONGER VALID"
    },
    {
        country_code: "DE",
        legal_code: "8570",
        description: "REINSTATEMENT OF THE FORMER POSITION"
    },
    {
        country_code: "DE",
        legal_code: "8580",
        description: "MISCELLANEOUS PART V"
    },
    {
        country_code: "DE",
        legal_code: "8581",
        description: "INVENTOR (NEW SITUATION)"
    },
    {
        country_code: "DE",
        legal_code: "8596",
        description: "REPRINT OF ERRONEOUS FRONT PAGE"
    },
    {
        country_code: "DE",
        legal_code: "8597",
        description: "REPRINT OF ERRONEOUS TRANSLATION"
    },
    {
        country_code: "DE",
        legal_code: "8607",
        description: "NOTIFICATION OF SEARCH RESULTS AFTER PUBLICATION"
    },
    {
        country_code: "DE",
        legal_code: "8629",
        description: "CHANGES IN THE PRIORITY TABLE"
    },
    {
        country_code: "DE",
        legal_code: "8642",
        description: "IMPACT ABOLISHED FOR DE - I.E. PCT APPL. NOT ENT. GERMAN PHASE"
    },
    {
        country_code: "DE",
        legal_code: "8643",
        description: "OTHER DISPOSAL"
    },
    {
        country_code: "DE",
        legal_code: "8664",
        description: "PUBLICATION OF PCT-APPLICATION IN DE WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "8665",
        description: "PUBLICATION OF PCT-APPLICATION IN GERMAN TRANSLATION REVOKED"
    },
    {
        country_code: "DE",
        legal_code: "8670",
        description: "REINSTATEMENT OF THE FORMER POSITION"
    },
    {
        country_code: "DE",
        legal_code: "8680",
        description: "MISCELLANEOUS PART VI"
    },
    {
        country_code: "DE",
        legal_code: "8681",
        description: "INVENTOR (NEW SITUATION)"
    },
    {
        country_code: "DE",
        legal_code: "8691",
        description: "REPRINT OF ERRONEOUS FRONT PAGE"
    },
    {
        country_code: "DE",
        legal_code: "8696",
        description: "REPRINT OF DEFECTIVE FRONT PAGE"
    },
    {
        country_code: "DE",
        legal_code: "8697",
        description: "REPRINT OF ERRONEOUS TRANSLATION"
    },
    {
        country_code: "DE",
        legal_code: "8698",
        description: "CORRECTION OF ERRONEOUS TITLE PAGE"
    },
    {
        country_code: "DE",
        legal_code: "8716",
        description: "SENTENCE IN ANNEX GERMAN PATENTBLATT ANNEX 1A6"
    },
    {
        country_code: "DE",
        legal_code: "AC",
        description: "DIVIDED OUT OF"
    },
    {
        country_code: "DE",
        legal_code: "AF",
        description: "IS ADDITION TO NO."
    },
    {
        country_code: "DE",
        legal_code: "AG",
        description: "HAS ADDITION NO."
    },
    {
        country_code: "DE",
        legal_code: "AH",
        description: "DIVISION IN"
    },
    {
        country_code: "DE",
        legal_code: "B1",
        description: "PUBLICATION OF THE EXAMINED APPLICATION WITHOUT PREVIOUS PUBLICATION OF UNEXAMINED APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "B2",
        description: "PUBLICATION OF THE EXAMINED APPLICATION AFTER PUBLICATION OF UNEXAMINED APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "BF",
        description: "WILLINGNESS TO GRANT LICENSES"
    },
    {
        country_code: "DE",
        legal_code: "BGA",
        description: "NEW PERSON/NAME/ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DE",
        legal_code: "BHJ",
        description: "NONPAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "BHN",
        description: "WITHDRAWAL"
    },
    {
        country_code: "DE",
        legal_code: "BHV",
        description: "REFUSAL"
    },
    {
        country_code: "DE",
        legal_code: "BHZ",
        description: "APPLICATION OF ADDITION CEASED THROUGH NON-PAYMENT OF ANNUAL FEE OF THE MAIN PATENT"
    },
    {
        country_code: "DE",
        legal_code: "BI",
        description: "MISCELLANEOUS SEE PART 2"
    },
    {
        country_code: "DE",
        legal_code: "C2",
        description: "GRANT AFTER PREVIOUS PUBLICATION (2ND PUBLICATION)"
    },
    {
        country_code: "DE",
        legal_code: "C3",
        description: "GRANT AFTER TWO PUBLICATION STEPS (3RD PUBLICATION)"
    },
    {
        country_code: "DE",
        legal_code: "D1",
        description: "GRANT (NO UNEXAMINED APPLICATION PUBLISHED) PATENT LAW 81"
    },
    {
        country_code: "DE",
        legal_code: "D2",
        description: "GRANT AFTER EXAMINATION"
    },
    {
        country_code: "DE",
        legal_code: "D3",
        description: "PATENT MAINTAINED RESTRICTED (NO UNEXAMINED APPLICATION PUBLISHED)"
    },
    {
        country_code: "DE",
        legal_code: "D4",
        description: "PATENT MAINTAINED RESTRICTED"
    },
    {
        country_code: "DE",
        legal_code: "D5",
        description: "PATENT MODIFIED IN THE RESTRICTION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "D6",
        description: "PATENT MODIFIED IN THE RESTRICTION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "D7",
        description: "PATENT MODIFIED IN THE RESTRICTION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "D8",
        description: "PATENT MODIFIED IN THE RESTRICTION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "E77",
        description: "VALID PATENT AS TO THE HEYMANNS-INDEX 1977"
    },
    {
        country_code: "DE",
        legal_code: "E771",
        description: "VALID PATENT AS TO THE HEYMANNS-INDEX 1977, WILLINGNESS TO GRANT LICENSES"
    },
    {
        country_code: "DE",
        legal_code: "EB",
        description: "DURATION OF PROTECTION PROLONGATED"
    },
    {
        country_code: "DE",
        legal_code: "EF",
        description: "WILLINGNESS TO GRANT LICENSES"
    },
    {
        country_code: "DE",
        legal_code: "EGA",
        description: "NEW PERSON/NAME/ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DE",
        legal_code: "EGZ",
        description: "APPLICATION OF ADDITION CEASED THROUGH NON-PAYMENT OF ANNUAL FEE OF MAIN PATENT"
    },
    {
        country_code: "DE",
        legal_code: "EHE",
        description: "CEASED/INVENTOR NOT NAMED"
    },
    {
        country_code: "DE",
        legal_code: "EHJ",
        description: "CEASED/NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "EHN",
        description: "CEASED/INVALIDATION"
    },
    {
        country_code: "DE",
        legal_code: "EHS",
        description: "CANCELLATION OF A FR-PATENT IN FORCE IN THE SAARLAND (FRG)"
    },
    {
        country_code: "DE",
        legal_code: "EHV",
        description: "CEASED/RENUNCIATION"
    },
    {
        country_code: "DE",
        legal_code: "EHZ",
        description: "PATENT OF ADDITION CEASED/NON-PAYMENT OF ANNUAL FEE OF PARENT PATENT"
    },
    {
        country_code: "DE",
        legal_code: "EI",
        description: "MISCELLANEOUS SEE PART 3"
    },
    {
        country_code: "DE",
        legal_code: "EIB",
        description: "RESTRICTED BY DECISION OF THE DE-PATENT OFFICE"
    },
    {
        country_code: "DE",
        legal_code: "EILA",
        description: "INVALIDATION OF THE CANCELLATION OF THE PATENT"
    },
    {
        country_code: "DE",
        legal_code: "EIN",
        description: "INVALID BY FINAL DECISION OF THE FEDERAL PATENT COURT"
    },
    {
        country_code: "DE",
        legal_code: "EINK",
        description: "PARTIAL INVALID BY DECISION OF THE FEDERAL COURT"
    },
    {
        country_code: "DE",
        legal_code: "EINT",
        description: "PARTIAL INVALID BY FINAL DECISION OF THE FEDERAL PATENT COURT"
    },
    {
        country_code: "DE",
        legal_code: "EINU",
        description: "INVALID BY DECISION OF THE FEDERAL COURT"
    },
    {
        country_code: "DE",
        legal_code: "I1",
        description: "PUBLICATION OF FILING OF CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "I2",
        description: "PUBLICATION OF GRANT OF CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "OAI",
        description: "SEARCH REPORT AVAILABLE AS TO PARAGRAPH 43 LIT. 1 SENTENCE 2 PATENT LAW"
    },
    {
        country_code: "DE",
        legal_code: "OAM",
        description: "SEARCH REPORT AVAILABLE"
    },
    {
        country_code: "DE",
        legal_code: "OAN",
        description: "NEW DOCUMENTS"
    },
    {
        country_code: "DE",
        legal_code: "OAO",
        description: "WITHOUT DESCRIPTION"
    },
    {
        country_code: "DE",
        legal_code: "OAOB",
        description: "WITHOUT DESCRIPTION"
    },
    {
        country_code: "DE",
        legal_code: "OAP",
        description: "REQUEST FOR EXAMINATION FILED"
    },
    {
        country_code: "DE",
        legal_code: "OAR",
        description: "REQUEST FOR SEARCH FILED"
    },
    {
        country_code: "DE",
        legal_code: "OAT",
        description: "REQUEST FOR SEARCH AS TO PARAGRAPH 43 LIT. 1 SENTENCE 2 PATENT LAW FILED"
    },
    {
        country_code: "DE",
        legal_code: "OAV",
        description: "APPLICANT AGREED TO THE PUBLICATION OF THE UNEXAMINED APPLICATION AS TO PARAGRAPH 31 LIT. 2 Z1"
    },
    {
        country_code: "DE",
        legal_code: "OB",
        description: "REQUEST FOR EXAMINATION AS TO NOVELTY"
    },
    {
        country_code: "DE",
        legal_code: "OC",
        description: "SEARCH REPORT AVAILABLE"
    },
    {
        country_code: "DE",
        legal_code: "OD",
        description: "REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DE",
        legal_code: "OE",
        description: "REQUEST FOR EXAMINATION VOID"
    },
    {
        country_code: "DE",
        legal_code: "OF",
        description: "WILLINGNESS TO GRANT LICENSES BEFORE PUBLICATION OF EXAMINED APPLICATION"
    },
    {
        country_code: "DE",
        legal_code: "OGA",
        description: "NEW PERSON/NAME/ADDRESS OF THE APPLICANT"
    },
    {
        country_code: "DE",
        legal_code: "OHA",
        description: "EXPIRATION OF TIME FOR REQUEST FOR EXAMINATION"
    },
    {
        country_code: "DE",
        legal_code: "OHB",
        description: "NON-PAYMENT OF THE PUBLICATION FEE (EXAMINED APPLICATION)"
    },
    {
        country_code: "DE",
        legal_code: "OHJ",
        description: "NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "OHN",
        description: "WITHDRAWAL"
    },
    {
        country_code: "DE",
        legal_code: "OHW",
        description: "REJECTION"
    },
    {
        country_code: "DE",
        legal_code: "OHZ",
        description: "APPLICATION OF ADDITION CEASED/NON-PAYMENT OF ANNUAL FEE OF THE MAIN PATENT"
    },
    {
        country_code: "DE",
        legal_code: "OI",
        description: "MISCELLANEOUS SEE PART 1"
    },
    {
        country_code: "DE",
        legal_code: "OM8",
        description: "SEARCH REPORT AVAILABLE AS TO PARAGRAPH 43 LIT. 1 SENTENCE 1 PATENT LAW"
    },
    {
        country_code: "DE",
        legal_code: "ON",
        description: "LATER SUBMITTED PAPERS"
    },
    {
        country_code: "DE",
        legal_code: "OP8",
        description: "REQUEST FOR EXAMINATION AS TO PARAGRAPH 44 PATENT LAW"
    },
    {
        country_code: "DE",
        legal_code: "OR8",
        description: "REQUEST FOR SEARCH AS TO PARAGRAPH 43 LIT. 1 SENTENCE 1 PATENT LAW"
    },
    {
        country_code: "DE",
        legal_code: "PK",
        description: "PUBLICATION DATE CORRECTED"
    },
    {
        country_code: "DE",
        legal_code: "Q161",
        description: "HAS ADDITIONAL APPLICATION NO."
    },
    {
        country_code: "DE",
        legal_code: "Q162",
        description: "APPLICATION BECAME INDEPENDENT"
    },
    {
        country_code: "DE",
        legal_code: "Q171",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "Q172",
        description: "DIVIDED OUT OF (SUPPLEMENT):"
    },
    {
        country_code: "DE",
        legal_code: "Q174",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "Q176",
        description: "REQUEST THAT UTILITY MODEL BE RULED INVALID WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "Q261",
        description: "HAS ADDITIONAL APPLICATION NO."
    },
    {
        country_code: "DE",
        legal_code: "Q271",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "Q272",
        description: "DIVIDED OUT OF:"
    },
    {
        country_code: "DE",
        legal_code: "Q276",
        description: "THE APPLICATION CAUSED THE SUSPENSE OF APPLICATION NO:"
    },
    {
        country_code: "DE",
        legal_code: "Q369",
        description: "DIVIDED OUT OF:"
    },
    {
        country_code: "DE",
        legal_code: "R001",
        description: "REFUSAL DECISION IN PRELIMINARY PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "R002",
        description: "REFUSAL DECISION IN EXAMINATION/REGISTRATION PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "R003",
        description: "REFUSAL DECISION NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R005",
        description: "APPLICATION DEEMED WITHDRAWN DUE TO FAILURE TO REQUEST EXAMINATION"
    },
    {
        country_code: "DE",
        legal_code: "R006",
        description: "APPEAL FILED"
    },
    {
        country_code: "DE",
        legal_code: "R007",
        description: "DECISION RECTIFIED ON APPEAL"
    },
    {
        country_code: "DE",
        legal_code: "R008",
        description: "CASE PENDING AT FEDERAL PATENTS COURT (FPC)"
    },
    {
        country_code: "DE",
        legal_code: "R009",
        description: "REMITTAL BY FPC TO DPMA FOR NEW DECISION OR REGISTRATION"
    },
    {
        country_code: "DE",
        legal_code: "R010",
        description: "APPEAL PROCEEDINGS SETTLED BY WITHDRAWAL OF APPEAL(S) OR IN SOME OTHER WAY"
    },
    {
        country_code: "DE",
        legal_code: "R011",
        description: "ALL APPEALS REJECTED, REFUSED OR OTHERWISE SETTLED"
    },
    {
        country_code: "DE",
        legal_code: "R012",
        description: "REQUEST FOR EXAMINATION VALIDLY FILED"
    },
    {
        country_code: "DE",
        legal_code: "R016",
        description: "RESPONSE TO EXAMINATION COMMUNICATION"
    },
    {
        country_code: "DE",
        legal_code: "R018",
        description: "GRANT DECISION BY EXAMINATION SECTION/EXAMINING DIVISION"
    },
    {
        country_code: "DE",
        legal_code: "R019",
        description: "GRANT DECISION BY FPC"
    },
    {
        country_code: "DE",
        legal_code: "R020",
        description: "PATENT GRANT NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R021",
        description: "SEARCH REQUEST VALIDLY FILED"
    },
    {
        country_code: "DE",
        legal_code: "R026",
        description: "OPPOSITION FILED AGAINST PATENT"
    },
    {
        country_code: "DE",
        legal_code: "R028",
        description: "DECISION THAT OPPOSITION INADMISSIBLE NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R030",
        description: "PATENT MAINTAINED UNAMENDED BY DECISIONOF FPC"
    },
    {
        country_code: "DE",
        legal_code: "R031",
        description: "DECISION OF EXAMINING DIVISION/FPC MAINTAINING PATENT UNAMENDED NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R034",
        description: "DECISION OF EXAMINING DIVISION/FPC MAINTAINING PATENT IN LIMITED FORM NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R037",
        description: "DECISION OF EXAMINING DIVISION/FPC REVOKING PATENT NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R038",
        description: "REQUEST FOR FPC DECISION ON PATENT"
    },
    {
        country_code: "DE",
        legal_code: "R039",
        description: "REVOCATION ACTION FILED"
    },
    {
        country_code: "DE",
        legal_code: "R040",
        description: "WITHDRAWAL/REFUSAL OF REVOCATION ACTION NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R042",
        description: "PATENT'S REVOCATION IN FULL NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R043",
        description: "PATENT'S REVOCATION IN PART NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R046",
        description: "LIMITATION REQUEST VALIDLY FILED"
    },
    {
        country_code: "DE",
        legal_code: "R047",
        description: "LIMITATION REQUEST WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R050",
        description: "EXAMING DIVISION/FPC DECISION LIMITING PATENT NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R055",
        description: "PATENTEE'S LIMITATION REQUEST RECEIVED BY EPO"
    },
    {
        country_code: "DE",
        legal_code: "R056",
        description: "PATENT LIMITED BY EPO AT PATENTEE'S REQUEST"
    },
    {
        country_code: "DE",
        legal_code: "R059",
        description: "REVOCATION REQUEST WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R061",
        description: "REVOCATION REQUEST RECEIVED BY EPO"
    },
    {
        country_code: "DE",
        legal_code: "R064",
        description: "EPO'S REVOCATION DECISION NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R065",
        description: "REQUEST FOR GRANT OF SUPPLEMENTARY PROTECTION CERTIFICATE VALIDLY FILED"
    },
    {
        country_code: "DE",
        legal_code: "R067",
        description: "EXAMINING DIVISION DECISION GRANTING SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "R069",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE GRANTED"
    },
    {
        country_code: "DE",
        legal_code: "R071",
        description: "EXPIRY OF RIGHT"
    },
    {
        country_code: "DE",
        legal_code: "R073",
        description: "RE-ESTABLISHMENT REQUESTED"
    },
    {
        country_code: "DE",
        legal_code: "R074",
        description: "RE-ESTABLISHMENT ALLOWED"
    },
    {
        country_code: "DE",
        legal_code: "R079",
        description: "AMENDMENT OF IPC MAIN CLASS"
    },
    {
        country_code: "DE",
        legal_code: "R080",
        description: "AMENDMENT OF IPC SUB-CLASS"
    },
    {
        country_code: "DE",
        legal_code: "R081",
        description: "CHANGE OF APPLICANT/PATENTEE"
    },
    {
        country_code: "DE",
        legal_code: "R082",
        description: "CHANGE OF REPRESENTATIVE"
    },
    {
        country_code: "DE",
        legal_code: "R083",
        description: "AMENDMENT OF/ADDITIONS TO INVENTOR(S)"
    },
    {
        country_code: "DE",
        legal_code: "R084",
        description: "DECLARATION OF WILLINGNESS TO LICENSE"
    },
    {
        country_code: "DE",
        legal_code: "R085",
        description: "WILLINGNESS TO LICENSE WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R086",
        description: "NON-BINDING DECLARATION OF LICENSING INTEREST"
    },
    {
        country_code: "DE",
        legal_code: "R087",
        description: "NON-BINDING LICENSING INTEREST WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R088",
        description: "EXCLUSIVE LICENCE REGISTERED"
    },
    {
        country_code: "DE",
        legal_code: "R096",
        description: "DPMA PUBLICATION OF MENTIONED EP PATENT GRANT"
    },
    {
        country_code: "DE",
        legal_code: "R097",
        description: "NO OPPOSITION FILED AGAINST GRANTED PATENT, OR EPO OPPOSITION PROCEEDINGS CONCLUDED WITHOUT DECISION"
    },
    {
        country_code: "DE",
        legal_code: "R100",
        description: "EPO DECISION MAINTAINING PATENT UNAMENDED NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R102",
        description: "EPO DECISION MAINTAINING PATENT IN AMENDED FORM NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R103",
        description: "PATENT REVOKED BY EPO"
    },
    {
        country_code: "DE",
        legal_code: "R107",
        description: "PUBLICATION OF GRANT OF EUROPEAN PATENT RESCINDED"
    },
    {
        country_code: "DE",
        legal_code: "R108",
        description: "DE NO LONGER DESIGNATED STATE"
    },
    {
        country_code: "DE",
        legal_code: "R118",
        description: "APPLICATION DEEMED WITHDRAWN DUE TO CLAIM FOR DOMESTIC PRIORITY"
    },
    {
        country_code: "DE",
        legal_code: "R119",
        description: "APPLICATION DEEMED WITHDRAWN, OR IP RIGHT LAPSED, DUE TO NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "R120",
        description: "APPLICATION WITHDRAWN OR IP RIGHT ABANDONED"
    },
    {
        country_code: "DE",
        legal_code: "R123",
        description: "APPLICATION DEEMED WITHDRAWN DUE TO NON-PAYMENT OF FILING FEE"
    },
    {
        country_code: "DE",
        legal_code: "R124",
        description: "RE-ESTABLISHMENT DECISION NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R125",
        description: "REQUEST FOR FURTHER PROCESSING FILED"
    },
    {
        country_code: "DE",
        legal_code: "R126",
        description: "REQUEST FOR FURTHER PROCESSING ALLOWED"
    },
    {
        country_code: "DE",
        legal_code: "R127",
        description: "REQUEST FOR FURTHER PROCESSING REFUSED OR DEEMED WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R129",
        description: "DIVISIONAL APPLICATION FROM"
    },
    {
        country_code: "DE",
        legal_code: "R130",
        description: "DIVISIONAL APPLICATION TO"
    },
    {
        country_code: "DE",
        legal_code: "R131",
        description: "DECLARATION OF DIVISION DEEMED NOT MADE"
    },
    {
        country_code: "DE",
        legal_code: "R132",
        description: "DIVISIONAL APPLICATION DEEMED WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R135",
        description: "EUROPEAN PATETN DEEMED VOID AB INITIO FOR DE"
    },
    {
        country_code: "DE",
        legal_code: "R138",
        description: "DERIVATION OF UTILITY MODEL"
    },
    {
        country_code: "DE",
        legal_code: "R139",
        description: "APPLICATION OF ADDITION TO"
    },
    {
        country_code: "DE",
        legal_code: "R140",
        description: "APPLICATION OF ADDITION NOW INDEPENDENT"
    },
    {
        country_code: "DE",
        legal_code: "R141",
        description: "THIS PATENT OF ADDITION IS NOW INDEPENDENT"
    },
    {
        country_code: "DE",
        legal_code: "R142",
        description: "LAPSE OF PATENT OF ADDITION DUE TO NON-PAYMENT OF RENEWAL FEES FOR PARENT PATENT"
    },
    {
        country_code: "DE",
        legal_code: "R143",
        description: "PROCEEDINGS SUSPENDED"
    },
    {
        country_code: "DE",
        legal_code: "R144",
        description: "END OF SUSPENSION OF PROCEEDINGS"
    },
    {
        country_code: "DE",
        legal_code: "R150",
        description: "TERM OF PROTECTION EXTENDED TO 6 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R151",
        description: "TERM OF PROTECTION EXTENDED TO 8 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R152",
        description: "TERM OF PROTECTION EXTENDED TO 10 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R153",
        description: "EXTENSION OF TERM OF PROTECTION RESCINDED"
    },
    {
        country_code: "DE",
        legal_code: "R156",
        description: "LAPSE OF IP RIGHT AFTER 3 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R157",
        description: "LAPSE OF IP RIGHT AFTER 6 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R158",
        description: "LAPSE OF IP RIGHT AFTER 8 YEARS"
    },
    {
        country_code: "DE",
        legal_code: "R161",
        description: "HAS ADDITIONAL APPLICATION NO."
    },
    {
        country_code: "DE",
        legal_code: "R162",
        description: "APPLICATION BECAME INDEPENDENT"
    },
    {
        country_code: "DE",
        legal_code: "R163",
        description: "IDENTIFIED PUBLICATIONS NOTIFIED"
    },
    {
        country_code: "DE",
        legal_code: "R165",
        description: "REQUEST FOR CANCELLATION OR RULING FILED"
    },
    {
        country_code: "DE",
        legal_code: "R168",
        description: "UTILITY MODEL CANCELED"
    },
    {
        country_code: "DE",
        legal_code: "R169",
        description: "UTILITY MODEL CANCELLED IN PART"
    },
    {
        country_code: "DE",
        legal_code: "R171",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "R172",
        description: "DIVIDED OUT OF (SUPPLEMENT):"
    },
    {
        country_code: "DE",
        legal_code: "R173",
        description: "REQUEST FOR CANCELLATION OF UTILITY MODEL WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R174",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "R176",
        description: "REQUEST THAT UTLITY MODEL BE RULED INVALID WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "R197",
        description: "NEW SUBSEQUENTLY FILED CLAIMS ON IP DOSSIER"
    },
    {
        country_code: "DE",
        legal_code: "R206",
        description: "AMENDED PATENT SPECIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "R207",
        description: "UTILITY MODEL SPECIFICATION"
    },
    {
        country_code: "DE",
        legal_code: "R210",
        description: "TRANSLATION OF EP CLAIMS"
    },
    {
        country_code: "DE",
        legal_code: "R225",
        description: "PUBLICATION OF MENTION OF WO PUBLICATION"
    },
    {
        country_code: "DE",
        legal_code: "R230",
        description: "REQUEST FOR EARLY PUBLICATION"
    },
    {
        country_code: "DE",
        legal_code: "R231",
        description: "PATENT ABANDONED FOR DE"
    },
    {
        country_code: "DE",
        legal_code: "R261",
        description: "HAS ADDITIONAL APPLICATION NO."
    },
    {
        country_code: "DE",
        legal_code: "R271",
        description: "DIVIDED OUT TO:"
    },
    {
        country_code: "DE",
        legal_code: "R272",
        description: "DIVIDED OUT OF:"
    },
    {
        country_code: "DE",
        legal_code: "R276",
        description: "THE APPLICATION CAUSED THE SUSPENSE OF APPLICATION NO:"
    },
    {
        country_code: "DE",
        legal_code: "R369",
        description: "DIVIDED OUT OF:"
    },
    {
        country_code: "DE",
        legal_code: "R409",
        description: "INTERNAL RECTIFICATION OF THE LEGAL STATUS COMPLETED"
    },
    {
        country_code: "DE",
        legal_code: "R420",
        description: "REQUEST FOR TERM EXTENSIONS (CHILDREN'S MEDICINES)"
    },
    {
        country_code: "DE",
        legal_code: "R422",
        description: "DECISION ON REQUEST FOR TERM EXTENSION (CHILDREN'S MEDICINES) NOW FINAL"
    },
    {
        country_code: "DE",
        legal_code: "R424",
        description: "NUMBER OF THE APPLICATION DELETED"
    },
    {
        country_code: "DE",
        legal_code: "R434",
        description: "REQUEST FOR TERM CORRECTION WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "SH",
        description: "REQUEST FOR EXAMINATION BETWEEN 03.10.1968 AND 22.04.1971"
    },
    {
        country_code: "DE",
        legal_code: "V448",
        description: "APPLICATION OF SPC"
    },
    {
        country_code: "DE",
        legal_code: "V454",
        description: "SPC APPLICATION WITHDRAWN OR TO BE REGARDED AS WITHDRAWN"
    },
    {
        country_code: "DE",
        legal_code: "V455",
        description: "RENUNCIATION OF SPC"
    },
    {
        country_code: "DE",
        legal_code: "V457",
        description: "SPC GRANTED"
    },
    {
        country_code: "DE",
        legal_code: "V460",
        description: "REQUEST OF ANNULATION FOR SPC"
    },
    {
        country_code: "DE",
        legal_code: "V462",
        description: "PART ANNULATION OF SPC BY LAW"
    },
    {
        country_code: "DE",
        legal_code: "V463",
        description: "APPLICATION OF ANNULLATION FOR SPC REVOKED OR WITHDRAWN BY LAW ORDER"
    },
    {
        country_code: "DE",
        legal_code: "V464",
        description: "SPC EXPIRED"
    },
    {
        country_code: "DE",
        legal_code: "V465",
        description: "SPC LAPSED DUE TO NONPAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "DE",
        legal_code: "V466",
        description: "LAPSED ACCORDING ART. 14D EU DECREE"
    },
    {
        country_code: "DE",
        legal_code: "V467",
        description: "APPLICATION OF REINSTATEMENT OF SPC"
    },
    {
        country_code: "DE",
        legal_code: "V472",
        description: "WITHDRAWAL OF APPLICATION FOR SPC"
    },
    {
        country_code: "DE",
        legal_code: "V484",
        description: "DELIVERY OF THE DECISION OF GRANT"
    },
    {
        country_code: "DE",
        legal_code: "V491",
        description: "SPC ANNULLED"
    },
    {
        country_code: "DE",
        legal_code: "V492",
        description: "SPC REGARDED AS ANNULLED CAUSED BY LAPSE OF BASIC PATENT"
    },
    {
        country_code: "DE",
        legal_code: "V502",
        description: "APPLICATION OF REINSTATEMENT OF SPC"
    },
    {
        country_code: "DE",
        legal_code: "V506",
        description: "REINSTATEMENT OF SPC ALLOWED; APPLICATION FOR SPC"
    },
    {
        country_code: "DE",
        legal_code: "V507",
        description: "INTERNAL CHANGE IN THE STATE OF PROCEEDINGS OF SPC; SPC APPLIED"
    },
    {
        country_code: "DE",
        legal_code: "V510",
        description: "REINSTATEMENT OF SPC ALLOWED; SPC GRANTED"
    },
    {
        country_code: "DE",
        legal_code: "V511",
        description: "INTERNAL CORRECTION OF STATE OF PROCEEDINGS OF SPC; SPC GRANTED"
    },
    {
        country_code: "DE",
        legal_code: "V646",
        description: "EXPIRY OF SPC"
    },
    {
        country_code: "DE",
        legal_code: "WID1",
        description: "REVOCATION BY DECISION OF THE PATENT DEPARTMENT"
    },
    {
        country_code: "DE",
        legal_code: "XX",
        description: "MISCELLANEOUS:"
    },
    {
        country_code: "DE",
        legal_code: "ZPFA",
        description: "FILING OF CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "DE",
        legal_code: "ZPFE",
        description: "GRANT OF CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "DE",
        legal_code: "ZPFN",
        description: "CERTIFICATE FOR PLANT PROTECTION SETTLED OR VOID"
    },
    {
        country_code: "DE",
        legal_code: "ZPZA",
        description: "REFUSAL OF APPLICATION OF CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "DE",
        legal_code: "ZPZG",
        description: "WITHDRAWAL OF APPLICATION OF CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "DE",
        legal_code: "ZTFA",
        description: "FILING OF CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "ZTFE",
        description: "GRANT OF CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "ZTFN",
        description: "CERTIFICATE SETTLED OR VOID"
    },
    {
        country_code: "DE",
        legal_code: "ZTZA",
        description: "REFUSAL OF APPLICATION FOR CERTIFICATE"
    },
    {
        country_code: "DE",
        legal_code: "ZTZG",
        description: "WITHDRAWAL OF APPLICATION FOR CERTIFICATE"
    },
    {
        country_code: "DK",
        legal_code: "A0",
        description: "APPLICATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "AGE",
        description: "RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "AHB",
        description: "APPLICATION SHELVED DUE TO NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "AHS",
        description: "APPLICATION SHELVED FOR OTHER REASONS THAN NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "ARF",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "ATS",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "B1",
        description: "PATENT GRANTED (LAW 1993)"
    },
    {
        country_code: "DK",
        legal_code: "B2",
        description: "PATENT AMENDED (LAW 1993)"
    },
    {
        country_code: "DK",
        legal_code: "B3",
        description: "PATENT SPECIFICATION AMENDED AFTER ADMINISTRTIVE REEXAMINATION (ACC. PATENT LAW 1993)"
    },
    {
        country_code: "DK",
        legal_code: "BP",
        description: "CORRECTION OF LAPSE OF PATENT"
    },
    {
        country_code: "DK",
        legal_code: "CTFF",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE FILED"
    },
    {
        country_code: "DK",
        legal_code: "CTFG",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE ISSUED"
    },
    {
        country_code: "DK",
        legal_code: "CTFL",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "CTFW",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE WITHDRAWN, REFUSED OR SHELVED"
    },
    {
        country_code: "DK",
        legal_code: "CTGE",
        description: "RE-ESTABLISHMENT OF SPC APPLICATION"
    },
    {
        country_code: "DK",
        legal_code: "CUG",
        description: "SUPPLEMENTARY PROTECTION CERTIFIATE REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "EAP",
        description: "PATENT SURRENDERED"
    },
    {
        country_code: "DK",
        legal_code: "EAU",
        description: "EP PATENT REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "EBP",
        description: "PATENT LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "EDA",
        description: "DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "EDD",
        description: "DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS AMENDED"
    },
    {
        country_code: "DK",
        legal_code: "EDF",
        description: "REQUEST FOR ADMINISTRATIVE RE-EXAMINATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "EDS",
        description: "REQUEST FOR ADMINISTRATIVE RE-EXAMINATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "EDV",
        description: "DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "EGA",
        description: "DECISION ON RE-ESTABLISHMENT OF RIGHTS: REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "EGB",
        description: "REQUEST FOR RE-ESTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "DK",
        legal_code: "EGE",
        description: "RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "ERA",
        description: "REQUEST FOR ADMINISTRATIVE RE-EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "EUG",
        description: "PATENT REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "EUP",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "DK",
        legal_code: "PAU",
        description: "RE-EXAMINATION: PATENT INVALID"
    },
    {
        country_code: "DK",
        legal_code: "PBP",
        description: "PATENT LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "PDA",
        description: "DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "PDD",
        description: "RE-EXAMINATION: PATENT MAINTAINED AS AMMENDED"
    },
    {
        country_code: "DK",
        legal_code: "PDF",
        description: "REQUEST FOR ADMINISTRATIVE RE-EXAMINATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "PDP",
        description: "DECISION ON OPPOSITION"
    },
    {
        country_code: "DK",
        legal_code: "PDQ",
        description: "REQUEST FOR OPPOSITION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "PDS",
        description: "REQUEST FOR ADMINISTRATIVE RE-EXAMINATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "PDU",
        description: "DECISION ON OPPOSITION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "PDV",
        description: "PATENT CEASED"
    },
    {
        country_code: "DK",
        legal_code: "PGA",
        description: "DECISION ON RE-ESTABLISHMENT OF RIGHTS: REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "PGB",
        description: "REQUEST FOR RE-ESTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "DK",
        legal_code: "PGE",
        description: "RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "PHB",
        description: "APPLICATION SHELVED DUE TO NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "PHS",
        description: "APPLICATION SHELVED FOR OTHER REASONS THAN NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "PIA",
        description: "OPPOSITION: PATENT MAINTAINED AS AMMENDED"
    },
    {
        country_code: "DK",
        legal_code: "PIU",
        description: "OPPOSITION: PATENT INVALID"
    },
    {
        country_code: "DK",
        legal_code: "PPF",
        description: "OPPOSITION FILED"
    },
    {
        country_code: "DK",
        legal_code: "PRA",
        description: "REQUEST ON ADMINISTRATIVE RE-EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "PRF",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "PSP",
        description: "PATENT SURRENDERED"
    },
    {
        country_code: "DK",
        legal_code: "PTS",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "PUG",
        description: "PATENT REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "PUP",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "DK",
        legal_code: "RAGE",
        description: "CORRECTION OF: RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "RAHB",
        description: "CORRECTION OF: APPLICATION SHELVED DUE TO NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "RAHS",
        description: "CORRECTION OF: APPLICATION SHELVED FOR OTHER REASONS THAN NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "RARF",
        description: "CORRECTION OF: APPLICATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "RATS",
        description: "CORRECTION OF: APPLICATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "REAP",
        description: "CORRECTION OF: PATENT SURRENDERED"
    },
    {
        country_code: "DK",
        legal_code: "REBP",
        description: "CORRECTION OF: PATENT LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "REDA",
        description: "CORRECTION OF: DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "REDD",
        description: "CORRECTION OF: DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS AMENDED"
    },
    {
        country_code: "DK",
        legal_code: "REDF",
        description: "CORRECTION OF: REQUEST FOR ADMINISTRATIVE RE-EXAMINATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "REDS",
        description: "CORRECTION OF: REQUEST FOR ADMINISTRATIVE RE-EXAMINATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "REDV",
        description: "CORRECTION OF: PATENT CEASED"
    },
    {
        country_code: "DK",
        legal_code: "REGA",
        description: "CORRECTION OF: DECISION ON RE-ESTABLISHMENT OF RIGHTS: REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "REGB",
        description: "CORRECTION OF: REQUEST FOR RE-ESTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "DK",
        legal_code: "REGE",
        description: "CORRECTION OF: RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "RERA",
        description: "CORRECTION OF: REQUEST FOR ADMINISTRATIVE RE-EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "REUG",
        description: "CORRECTION OF: PATENT REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "REUP",
        description: "CORRECTION OF: PATENT EXPIRED"
    },
    {
        country_code: "DK",
        legal_code: "RPBP",
        description: "CORRECTION OF: PATENT LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "RPC",
        description: "CORRECTION OF: GRANT (GRANT NULLIFIED)"
    },
    {
        country_code: "DK",
        legal_code: "RPDA",
        description: "CORRECTION OF: DECISION ON ADMINISTRATIVE RE-EXAMINATION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "RPDF",
        description: "CORRECTION OF: REQUEST FOR ADMINISTRATIVE RE-EXAMINATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "RPDQ",
        description: "CORRECTION OF: REQUEST FOR OPPOSITION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "RPDS",
        description: "CORRECTION OF: REQUEST FOR ADMINISTRATIVE RE-EXAMINATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "RPDU",
        description: "CORRECTION OF: DECISION ON OPPOSITION: PATENT MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "RPDV",
        description: "CORRECTION OF: PATENT CEASED"
    },
    {
        country_code: "DK",
        legal_code: "RPGA",
        description: "CORRECTION OF: DECISION ON RE-ESTABLISHMENT OF RIGHTS: REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "RPGB",
        description: "CORRECTION OF: REQUEST FOR RE-ESTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "DK",
        legal_code: "RPGE",
        description: "CORRECTION OF: RE-ESTABLISHMENT OF RIGHTS: APPROVED"
    },
    {
        country_code: "DK",
        legal_code: "RPHB",
        description: "CORRECTION OF: APPLICATION SHELVED DUE TO NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "RPHS",
        description: "CORRECTION OF: APPLICATION SHELVED FOR OTHER REASONS THAN NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "RPPF",
        description: "CORRECTION OF: OPPOSITION FILED"
    },
    {
        country_code: "DK",
        legal_code: "RPRA",
        description: "CORRECTION OF: REQUEST ON ADMINISTRATIVE RE-EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "RPRF",
        description: "CORRECTION OF: APPLICATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "RPSP",
        description: "CORRECTION OF: PATENT SURRENDERED"
    },
    {
        country_code: "DK",
        legal_code: "RPTS",
        description: "CORRECTION OF: APPLICATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "RPUG",
        description: "CORRECTION OF: PATENT REVOKED"
    },
    {
        country_code: "DK",
        legal_code: "RPUP",
        description: "CORRECTION OF: PATENT EXPIRED"
    },
    {
        country_code: "DK",
        legal_code: "RUBP",
        description: "CORRECTION OF: UTILITY MODEL LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "RUDE",
        description: "CORRECTION OF: DECISION ON TERMINATION: TOTAL TERMINATION"
    },
    {
        country_code: "DK",
        legal_code: "RUDM",
        description: "CORRECTION OF: DECISION ON TERMINATION: UTILITY MODEL MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "RUDV",
        description: "CORRECTION OF: UTILITY MODEL CEASED"
    },
    {
        country_code: "DK",
        legal_code: "RURA",
        description: "CORRECTION OF: REQUEST FOR TERMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "RUYA",
        description: "CORRECTION OF: REQUEST FOR EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "RUYD",
        description: "CORRECTION OF: DECISION ON EXAMINATION: UTILITY MODEL MAINTAINED AS AMENDED"
    },
    {
        country_code: "DK",
        legal_code: "RUYM",
        description: "CORRECTION OF: DECISION ON EXAMINATION: UTILITY MODEL MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "RUYT",
        description: "CORRECTION OF: DECISION ON EXAMINATION: UTILITY MODEL TERMINATED"
    },
    {
        country_code: "DK",
        legal_code: "SPCE",
        description: "FILING AN EXTENSION FOR AN SPC"
    },
    {
        country_code: "DK",
        legal_code: "SPCX",
        description: "EXPIRY OF AN SPC"
    },
    {
        country_code: "DK",
        legal_code: "SPCY",
        description: "REJECTION OF AN EXTENSION FOR AN SPC"
    },
    {
        country_code: "DK",
        legal_code: "SPCZ",
        description: "GRANT OF EXTENSION FOR AN SPC"
    },
    {
        country_code: "DK",
        legal_code: "T1",
        description: "TRANSLATION OF THE CLAIMS OF EP PATENT"
    },
    {
        country_code: "DK",
        legal_code: "T2",
        description: "CORRECTED TRANSLATION OF THE CLAIMS OF EP PATENT"
    },
    {
        country_code: "DK",
        legal_code: "T3",
        description: "TRANSLATION OF EP PATENT"
    },
    {
        country_code: "DK",
        legal_code: "T4",
        description: "TRANSLATION OF AMENDED EP PATENT"
    },
    {
        country_code: "DK",
        legal_code: "T5",
        description: "CORRECTED TRANSLATION OF EP PATENT"
    },
    {
        country_code: "DK",
        legal_code: "T6",
        description: "EP PATENT WITH LIMITED CLAIMS"
    },
    {
        country_code: "DK",
        legal_code: "UBP",
        description: "UTILITY MODEL LAPSED"
    },
    {
        country_code: "DK",
        legal_code: "UDD",
        description: "DECISION OF EXAMINATION: UTILITY MODEL MAINTAINED AS AMENDED"
    },
    {
        country_code: "DK",
        legal_code: "UDE",
        description: "DECISION ON TERMINATION: TOTAL TERMINATION"
    },
    {
        country_code: "DK",
        legal_code: "UDM",
        description: "DECISION ON TERMINATION: UTILITY MODEL MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "UDV",
        description: "UTILITY MODEL CEASED"
    },
    {
        country_code: "DK",
        legal_code: "UHB",
        description: "APPLICATION (UTILITY MODEL) SHELVED DUE TO NON-PAYMENT"
    },
    {
        country_code: "DK",
        legal_code: "URA",
        description: "REQUEST FOR TERMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "URF",
        description: "UTILITY MODEL: APPLICATION REFUSED"
    },
    {
        country_code: "DK",
        legal_code: "UTS",
        description: "UTILITY MODEL APPLICATION WITHDRAWN"
    },
    {
        country_code: "DK",
        legal_code: "UUP",
        description: "UTILITY MODEL EXPIRED"
    },
    {
        country_code: "DK",
        legal_code: "UYA",
        description: "REQUEST FOR EXAMINATION FILED"
    },
    {
        country_code: "DK",
        legal_code: "UYD",
        description: "DECISION ON EXAMINATION: UTILITY MODEL MAINTAINED AS AMENDED"
    },
    {
        country_code: "DK",
        legal_code: "UYM",
        description: "DECISION ON EXAMINATION: UTILITY MODEL MAINTAINED AS UNAMENDED"
    },
    {
        country_code: "DK",
        legal_code: "UYT",
        description: "DECISION ON EXAMINATION: UTILITY MODEL TERMINATED"
    },
    {
        country_code: "Eurasian",
        legal_code: "Patent",
        description: "Office"
    },
    {
        country_code: "EA",
        legal_code: "DZ4A",
        description: "EURASIAN PATENT ASSIGNED FOR AMENDMENT OF CLAIMS"
    },
    {
        country_code: "EA",
        legal_code: "FA9A",
        description: "WITHDRAWAL OF A EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "HC1A",
        description: "CHANGE IN NAME OF AN APPLICANT IN A EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "HK1A",
        description: "ERRATA IN EAPO OFFICIAL GAZETTE IN PUBLISHED EURASIAN APPLICATIONS"
    },
    {
        country_code: "EA",
        legal_code: "HM1A",
        description: "CHANGE IN COMPOSITION OF INVENTORS IN A PUBLISHED EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "HM2A",
        description: "CHANGE IN COMPOSITION OF INVENTORS IN A PUBLISHED EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "LD4A",
        description: "REISSUED SPECIFICATION TO EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "MC4A",
        description: "REVOCATION OF A EURASIAN PATENT UNDER OPPOSITION PROCEDURE"
    },
    {
        country_code: "EA",
        legal_code: "MF4A",
        description: "REVOCATION OF A EURASIAN PATENT AS INVALID ENTIRELY"
    },
    {
        country_code: "EA",
        legal_code: "MH4A",
        description: "REVOCATION OF A EURASIAN PATENT IN PART"
    },
    {
        country_code: "EA",
        legal_code: "MH4D",
        description: "REVOCATION OF A EURASIAN PATENT IN PART"
    },
    {
        country_code: "EA",
        legal_code: "MM4A",
        description: "LAPSE OF A EURASIAN PATENT IN CONTRACTING STATES DUE TO NON-PAYMENT WITHIN THE TIME LIMIT OF RENEWAL FEES"
    },
    {
        country_code: "EA",
        legal_code: "ND4A",
        description: "EXTENSION OF TERM OF A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "NF4A",
        description: "RESTORATION OF LAPSED RIGHT TO A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "NF9A",
        description: "RESTORATION OF LAPSED RIGHT TO A EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "PC1A",
        description: "REGISTRATION OF TRANSFER TO A EURASIAN APPLICATION BY FORCE OF ASSIGNMENT"
    },
    {
        country_code: "EA",
        legal_code: "PC4A",
        description: "REGISTRATION OF TRANSFER OF A EURASIAN PATENT BY ASSIGNMENT"
    },
    {
        country_code: "EA",
        legal_code: "PD1A",
        description: "REGISTRATION OF TRANSFER TO A EURASIAN APPLICATION BY ORDER OF SUCCESSION IN TITLE"
    },
    {
        country_code: "EA",
        legal_code: "PD4A",
        description: "REGISTRATION OF TRANSFER OF A EURASIAN PATENT IN ACCORDANCE WITH THE SUCCESSION IN TITLE"
    },
    {
        country_code: "EA",
        legal_code: "PZ1A",
        description: "REGISTRATION OF PLEDGE OF RIGHTS TO A EURASIAN APPLICATION"
    },
    {
        country_code: "EA",
        legal_code: "PZ4A",
        description: "REGISTRATION OF PLEDGE OF RIGHTS TO A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "QB4A",
        description: "REGISTRATION OF A LICENSE IN A CONTRACTING STATE"
    },
    {
        country_code: "EA",
        legal_code: "QC4A",
        description: "TERMINATION OF A REGISTERED LICENSE IN A CONTRACTING STATE"
    },
    {
        country_code: "EA",
        legal_code: "QZ4A",
        description: "REGISTERED CORRECTIONS AND AMENDMENTS IN A LICENSE"
    },
    {
        country_code: "EA",
        legal_code: "RH4A",
        description: "GRANT OF A DUPLICATE OF A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "RL4A",
        description: "COURT DECISIONS RENDERED IN RESPECT OF A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "TB4A",
        description: "CORRECTION OF COMPOSITION OF INVENTORS IN A PUBLISHED EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "TC4A",
        description: "CHANGE IN NAME OF A PATENT PROPRIETOR IN A EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "TH4A",
        description: "CORRECTION OF GENERAL CHARACTER IN A PUBLISHED EURASIAN PATENT"
    },
    {
        country_code: "EA",
        legal_code: "TK4A",
        description: "CORRECTIONS IN PUBLISHED EURASIAN PATENTS"
    },
    {
        country_code: "EE",
        legal_code: "AA1Y",
        description: "SPC FILED"
    },
    {
        country_code: "EE",
        legal_code: "BB2E",
        description: "TRANSLATION OF THE CLAIMS OF A PUBLISHED EUROPEAN PATENT APPLICATION"
    },
    {
        country_code: "EE",
        legal_code: "FC1Y",
        description: "SPC APPLICATION REFUSED"
    },
    {
        country_code: "EE",
        legal_code: "FG1Y",
        description: "SPC GRANTED"
    },
    {
        country_code: "EE",
        legal_code: "FG4A",
        description: "TRANSLATION OF THE SPECIFICATION OF EUROPEAN PATENT VALID IN ESTONIA"
    },
    {
        country_code: "EE",
        legal_code: "GB1A",
        description: "CHANGE IN THE OWNERSHIP OR IN THE ADDRESS OF THE OWNER"
    },
    {
        country_code: "EE",
        legal_code: "HA1A",
        description: "CORRECTION OF INVENTOR NAME OR ADDRESS"
    },
    {
        country_code: "EE",
        legal_code: "HB1A",
        description: "CORRECTION OF OWNER MAME / ADDRESS"
    },
    {
        country_code: "EE",
        legal_code: "HC1A",
        description: "CHANGE OF OWNER NAME"
    },
    {
        country_code: "EE",
        legal_code: "HD1A",
        description: "CORRECTION OF ADDRESS"
    },
    {
        country_code: "EE",
        legal_code: "HE1A",
        description: "CHANGE OF ADDRESS"
    },
    {
        country_code: "EE",
        legal_code: "HF1A",
        description: "CORRECTION OF A DATE"
    },
    {
        country_code: "EE",
        legal_code: "HG1A",
        description: "CORRECTION OF CLASSIFICATION"
    },
    {
        country_code: "EE",
        legal_code: "HH1A",
        description: "CHANGE OF REPRESENTATIVE"
    },
    {
        country_code: "EE",
        legal_code: "HH2A",
        description: "CORRECTION OF EP APPLICATION AND TRANSLATION OF THE SPECIFICATION OF A EUROPEAN PATENT VALID IN ESTONIA"
    },
    {
        country_code: "EE",
        legal_code: "HK1A",
        description: "ERRATUM IN GAZETTE"
    },
    {
        country_code: "EE",
        legal_code: "KB4A",
        description: "VALID PATENT AT THE END OF A YEAR"
    },
    {
        country_code: "EE",
        legal_code: "LD4A",
        description: "AMENDMENT IN THE SPECIFICATION"
    },
    {
        country_code: "EE",
        legal_code: "MA4A",
        description: "ABANDONMENT OR WITHDRAWAL"
    },
    {
        country_code: "EE",
        legal_code: "MC1Y",
        description: "ANNULMENT OF AN SPC"
    },
    {
        country_code: "EE",
        legal_code: "MF4A",
        description: "RIGHT REVOKED FOLLOWING OPPOSITION OR REVOCATION"
    },
    {
        country_code: "EE",
        legal_code: "MM4A",
        description: "LAPSED BY NOT PAYING THE ANNUAL FEES"
    },
    {
        country_code: "EE",
        legal_code: "QB4A",
        description: "LICENCE REGISTERED"
    },
    {
        country_code: "EE",
        legal_code: "QZ4A",
        description: "LICENCE REGISTERED"
    },
    {
        country_code: "EE",
        legal_code: "RZ4A",
        description: "PLEDGE REGISTRATION"
    },
    {
        country_code: "European",
        legal_code: "Patent",
        description: "Office"
    },
    {
        country_code: "EP",
        legal_code: "110E",
        description: "REQUEST FOR CONVERSION INTO A NATIONAL PATENT APPLICATION"
    },
    {
        country_code: "EP",
        legal_code: "111L",
        description: "LICENSES"
    },
    {
        country_code: "EP",
        legal_code: "111R",
        description: "OTHER RIGHTS \\\"IN REM\\\""
    },
    {
        country_code: "EP",
        legal_code: "111Z",
        description: "REGISTERING OF LICENCES OR OTHER RIGHTS"
    },
    {
        country_code: "EP",
        legal_code: "16A",
        description: "NEW DOCUMENTS DISCOVERED AFTER COMPLETION OF THE EP-SEARCH REPORT"
    },
    {
        country_code: "EP",
        legal_code: "17A",
        description: "APPLICATION MAINTAINED"
    },
    {
        country_code: "EP",
        legal_code: "17P",
        description: "REQUEST FOR EXAMINATION FILED"
    },
    {
        country_code: "EP",
        legal_code: "17Q",
        description: "FIRST EXAMINATION REPORT"
    },
    {
        country_code: "EP",
        legal_code: "18D",
        description: "DEEMED TO BE WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "18R",
        description: "REFUSED"
    },
    {
        country_code: "EP",
        legal_code: "18RA",
        description: "DATE OF RECEIPT OF REQUEST FOR RE-ESTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "EP",
        legal_code: "18RR",
        description: "RE-ESTABLISHED"
    },
    {
        country_code: "EP",
        legal_code: "18W",
        description: "WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "19A",
        description: "DATE OF STAY OF PROCEEDINGS [BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "19F",
        description: "DATE OF RESUMPTION (AFTER STAY OF PROCEEDINGS) [BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "19U",
        description: "DATE OF INTERRUPTION (INTERRUPTION OF PROCEEDINGS)[BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "19W",
        description: "DATE OF RESUMPTION (AFTER INTERRUPTION OF PROCEEDINGS)[BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "25",
        description: "LAPSED IN A CONTRACTING STATE ANNOUNCED VIA POSTGRANT INFORM. FROM NAT. OFFICE TO EPO"
    },
    {
        country_code: "EP",
        legal_code: "25N",
        description: "VALID IN ALL DESIGNATED STATES"
    },
    {
        country_code: "EP",
        legal_code: "26",
        description: "OPPOSITION FILED"
    },
    {
        country_code: "EP",
        legal_code: "26D",
        description: "OPPOSITION DEEMED NOT TO HAVE BEEN FILED"
    },
    {
        country_code: "EP",
        legal_code: "26N",
        description: "NO OPPOSITION FILED"
    },
    {
        country_code: "EP",
        legal_code: "26U",
        description: "INADMISSIBLE OPPOSITION"
    },
    {
        country_code: "EP",
        legal_code: "27A",
        description: "MAINTAINED AS AMENDED"
    },
    {
        country_code: "EP",
        legal_code: "27C",
        description: "TERMINATION OF OPPOSITION PROCEDURE"
    },
    {
        country_code: "EP",
        legal_code: "27O",
        description: "OPPOSITION REJECTED"
    },
    {
        country_code: "EP",
        legal_code: "27W",
        description: "REVOKED"
    },
    {
        country_code: "EP",
        legal_code: "28",
        description: "RE-ESTABLISHED"
    },
    {
        country_code: "EP",
        legal_code: "29A",
        description: "SUSPENSION OF PROCEEDINGS (CORRECTION)[AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "29F",
        description: "THE RESUMPTION OF A PREVIOUS INCORRECT ANNOUNCEMENT OF A SUSPENSION OF PROCEEDINGS (CORRECTION) [AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "29U",
        description: "DATE OF INTERRUPTION (INTERRUPTION OF PROCEEDINGS) [AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "29W",
        description: "DATE OF RESUMPTION (AFTER INTERRUPTION OF PROCEEDINGS) [AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "31I",
        description: "INTERRUPTION"
    },
    {
        country_code: "EP",
        legal_code: "31R",
        description: "RESUMPTION"
    },
    {
        country_code: "EP",
        legal_code: "31S",
        description: "SUSPENSION"
    },
    {
        country_code: "EP",
        legal_code: "31W",
        description: "RESUMPTION"
    },
    {
        country_code: "EP",
        legal_code: "32",
        description: "CONVERSION"
    },
    {
        country_code: "EP",
        legal_code: "32PN",
        description: "PUBLIC NOTIFICATION"
    },
    {
        country_code: "EP",
        legal_code: "33",
        description: "TRANSFER OF RIGHTS"
    },
    {
        country_code: "EP",
        legal_code: "34E",
        description: "ESTABLISHMENT OF OTHER RIGHTS \\\"IN REM\\\""
    },
    {
        country_code: "EP",
        legal_code: "34G",
        description: "GRANT OF LICENSES"
    },
    {
        country_code: "EP",
        legal_code: "34L",
        description: "LEGAL MEANS OF EXECUTION"
    },
    {
        country_code: "EP",
        legal_code: "34TL",
        description: "TRANSFER OF LICENSES"
    },
    {
        country_code: "EP",
        legal_code: "34TR",
        description: "TRANSFER OF OTHER RIGHTS \\\"IN REM\\\""
    },
    {
        country_code: "EP",
        legal_code: "35",
        description: "CORRECTION"
    },
    {
        country_code: "EP",
        legal_code: "710B",
        description: "GB: PROCEEDING UNDER RULE 110(4) PATENTS ACT 1977"
    },
    {
        country_code: "EP",
        legal_code: "7119",
        description: "GB: EP PATENT (UK) WITHDRAWN (SECTION 117/1977)"
    },
    {
        country_code: "EP",
        legal_code: "A4",
        description: "SUPPLEMENTARY SEARCH REPORT"
    },
    {
        country_code: "EP",
        legal_code: "A5",
        description: "SEPARATE PUBLICATION OF THE EP OR INT. SEARCH REPORT"
    },
    {
        country_code: "EP",
        legal_code: "AC",
        description: "DIVISIONAL APPLICATION (ART. 76) OF:"
    },
    {
        country_code: "EP",
        legal_code: "AF",
        description: "SUCCESSIVE APPLICATION (ART. 61)"
    },
    {
        country_code: "EP",
        legal_code: "AK",
        description: "DESIGNATED CONTRACTING STATES:"
    },
    {
        country_code: "EP",
        legal_code: "AKNL",
        description: "NL: CORRECTIONS (PART 1 HEADING G)"
    },
    {
        country_code: "EP",
        legal_code: "AKX",
        description: "PAYMENT OF DESIGNATION FEES"
    },
    {
        country_code: "EP",
        legal_code: "AKY",
        description: "NO DESIGNATION FEES PAID"
    },
    {
        country_code: "EP",
        legal_code: "AX",
        description: "EXTENSION OR VALIDATION OF THE EUROPEAN PATENT TO"
    },
    {
        country_code: "EP",
        legal_code: "AXX",
        description: "PAYMENT OF EXTENSION FEES"
    },
    {
        country_code: "EP",
        legal_code: "BE20",
        description: "BE: PATENT EXPIRED"
    },
    {
        country_code: "EP",
        legal_code: "BECA",
        description: "BE: CHANGE OF HOLDER'S ADDRESS"
    },
    {
        country_code: "EP",
        legal_code: "BECH",
        description: "BE: CHANGE OF HOLDER"
    },
    {
        country_code: "EP",
        legal_code: "BECN",
        description: "BE: CHANGE OF HOLDER'S NAME"
    },
    {
        country_code: "EP",
        legal_code: "BERE",
        description: "BE: LAPSED"
    },
    {
        country_code: "EP",
        legal_code: "BERR",
        description: "BE: REESTABLISHED"
    },
    {
        country_code: "EP",
        legal_code: "CCHV",
        description: "BE: GRANT OF A COMPLEMENTARY PROTECTION CERTIFICATE FOR HERBICIDES"
    },
    {
        country_code: "EP",
        legal_code: "CCPA",
        description: "BE: APPLICATION FOR A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "CCPR",
        description: "BE: REJECTION OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "CCPT",
        description: "BE: WITHDRAWAL OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "CCPV",
        description: "BE: GRANT OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "CCRE",
        description: "BE: EXPIRY OF A COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "CND3",
        description: "COPIED FROM NATIONAL REGISTER ON DEMAND OF THIRD PARTY"
    },
    {
        country_code: "EP",
        legal_code: "CRD3",
        description: "COPY OF EPO REGISTER ON DEMAND OF THIRD PARTY"
    },
    {
        country_code: "EP",
        legal_code: "D11X",
        description: "LEGAL MEANS OF EXECUTION (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D17D",
        description: "SEARCH REPORT (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D17P",
        description: "REQUEST FOR EXAMINATION FILED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D17Q",
        description: "FIRST EXAMINATION REPORT (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D18D",
        description: "EP-APPLICATION DEEMED TO BE WITHDRAWN: (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D18R",
        description: "REFUSED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D18W",
        description: "WITHDRAWAL (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D18Z",
        description: "REQUEST FOR RE-ESTABLISHMENT (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D19F",
        description: "PREVIOUSLY ANNOUNCED \\\"RESUMPTION AFTER INTERRUPTION OF PROCEEDINGS\\\" WAS ERRONEOUS"
    },
    {
        country_code: "EP",
        legal_code: "D20",
        description: "CORRECTIONS OF A PATENT SPECIFICATION (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D25",
        description: "LAPSED IN A CONTRACTING STATE (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D26",
        description: "OPPOSITION FILED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D26N",
        description: "NO OPPOSITION FILED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D27A",
        description: "MAINTAINED AS AMENDED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D27C",
        description: "OPPOSITION FINISHED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D27O",
        description: "OPPOSITION REJECTED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D27W",
        description: "REVOKED (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "D8RA",
        description: "DATE OF RECEIPT OF REQUEST FOR RE-ESTABLISHMENT OF RIGHTS (ART 122) (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DA1",
        description: "DATE AND KIND OF FIRST PUBLICATION (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DA4",
        description: "DATE AND KIND OF SUPPLEMENTARY SEARCH REPORT (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DAC",
        description: "DIVISIONAL APPLICATION (ART. 76) OF: (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DAF",
        description: "SUCCESSIVE APPLICATION (ART. 61) (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DAHF",
        description: "DIVISIONAL APPLICATION (ART 76) IN: (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DAX",
        description: "EXTENSION OF THE EUROPEAN PATENT TO (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DB1",
        description: "DATE AND KIND OF SECOND PUBLICATION (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DB2",
        description: "DATE OF PUBLICATION OF NEW SECOND SPECIFICATION ** LAST ENTRY DELETED"
    },
    {
        country_code: "EP",
        legal_code: "DBV",
        description: "DESIGNATED CONTRACTING STATES (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DET",
        description: "DE: TRANSLATION OF PATENT CLAIMS"
    },
    {
        country_code: "EP",
        legal_code: "DIN1",
        description: "INVENTOR (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DIN2",
        description: "INVENTOR (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "DX",
        description: "MISCELLANEOUS: (DELETED)"
    },
    {
        country_code: "EP",
        legal_code: "EAL",
        description: "SE: EUROPEAN PATENT IN FORCE IN SWEDEN"
    },
    {
        country_code: "EP",
        legal_code: "EL",
        description: "FR: TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "EL1",
        description: "FR: TRANSLATION OR CORRECTED TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "EM",
        description: "FR: REVISED TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "EN",
        description: "FR: TRANSLATION NOT FILED"
    },
    {
        country_code: "EP",
        legal_code: "EN3",
        description: "FR: TRANSLATION NOT FILED ** DECISION CONCERNING OPPOSITION"
    },
    {
        country_code: "EP",
        legal_code: "EN4",
        description: "FR: NOTIFICATION OF NON FILING TRANSLATION IN AN EARLIER BOPI IS ERRONEOUS"
    },
    {
        country_code: "EP",
        legal_code: "EPTA",
        description: "LU: LAST PAID ANNUAL FEE"
    },
    {
        country_code: "EP",
        legal_code: "ET",
        description: "FR: TRANSLATION FILED"
    },
    {
        country_code: "EP",
        legal_code: "ET1",
        description: "FR: TRANSLATION FILED ** REVISION OF THE TRANSLATION OF THE PATENT OR THE CLAIMS"
    },
    {
        country_code: "EP",
        legal_code: "ET2",
        description: "FR: TRANSLATION FILED ** REVISION OF THE TRANSLATION OF THE MODIFIED PATENT AFTER OPPOSITION"
    },
    {
        country_code: "EP",
        legal_code: "ET3",
        description: "FR: TRANSLATION FILED ** DECISION CONCERNING OPPOSITION"
    },
    {
        country_code: "EP",
        legal_code: "ETR",
        description: "FR: TRANSLATION FILED ** RESTORATION OF THE RIGHT"
    },
    {
        country_code: "EP",
        legal_code: "EUG",
        description: "SE: EUROPEAN PATENT HAS LAPSED"
    },
    {
        country_code: "EP",
        legal_code: "FDY",
        description: "FILE DESTROYED"
    },
    {
        country_code: "EP",
        legal_code: "FIT",
        description: "IT: SPC for herbicidal products: no action taken"
    },
    {
        country_code: "EP",
        legal_code: "FITA",
        description: "IT: SPC for herbicidal products: examined"
    },
    {
        country_code: "EP",
        legal_code: "FITB",
        description: "IT: SPC for herbicidal products: suspended"
    },
    {
        country_code: "EP",
        legal_code: "FITC",
        description: "IT: SPC for herbicidal products: partially granted"
    },
    {
        country_code: "EP",
        legal_code: "FITD",
        description: "IT: SPC for herbicidal products: granted"
    },
    {
        country_code: "EP",
        legal_code: "FITE",
        description: "IT: SPC for herbicidal products: interlocutary refusal"
    },
    {
        country_code: "EP",
        legal_code: "FITF",
        description: "IT: SPC for herbicidal products: office refusal"
    },
    {
        country_code: "EP",
        legal_code: "FITG",
        description: "IT: SPC for herbicidal products: definitive refusal"
    },
    {
        country_code: "EP",
        legal_code: "FITH",
        description: "IT: SPC for herbicidal products: Board of Appeal"
    },
    {
        country_code: "EP",
        legal_code: "FITI",
        description: "IT: SPC for herbicidal products: Court of Cassation"
    },
    {
        country_code: "EP",
        legal_code: "FITL",
        description: "IT: SPC for herbicidal products: Court of Justice"
    },
    {
        country_code: "EP",
        legal_code: "FITM",
        description: "IT: SPC for herbicidal products: Withdrawal of SPC application"
    },
    {
        country_code: "EP",
        legal_code: "FITN",
        description: "IT: SPC for herbicidal products: Annulment of SPC"
    },
    {
        country_code: "EP",
        legal_code: "FITO",
        description: "IT: SPC for herbicidal products: Expiry"
    },
    {
        country_code: "EP",
        legal_code: "FITP",
        description: "IT: SPC for herbicidal products: Renunciation of SPC"
    },
    {
        country_code: "EP",
        legal_code: "GBA",
        description: "GB: TRANSLATION AMENDED (GB SECTION 77(6)(A)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBAT",
        description: "GB: AMENDMENT OF TRANSLATION ALLOWED (OF EP PATENT) (GB SECT. 80(3)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBAW",
        description: "GB: APPLICATION WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "GBC",
        description: "GB: TRANSLATION OF CLAIMS FILED (GB SECTION 78(7)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBC8",
        description: "GB: TRANSLATION OF CLAIMS FILED (GB SECTION 80(3)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBCC",
        description: "GB: CORRECTED TRANSLATION (OF CLAIMS) FILED (GB SECTION 80(3)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBDL",
        description: "GB: DELETE \\\"EUROPEAN PATENT CEASED\\\" FROM JOURNAL"
    },
    {
        country_code: "EP",
        legal_code: "GBDW",
        description: "GB: GB DESIGNATION WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "GBGD",
        description: "GB: DATE OF PUBLICATION OF THE NEW SPECIFICATION OF THE PATENT UNDER ARTICLE 103 (1977) ** GRANT DATE WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "GBGR",
        description: "GB: GRANT DATE REVOKED"
    },
    {
        country_code: "EP",
        legal_code: "GBGW",
        description: "GB: GRANT DATE WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "GBPC",
        description: "GB: EUROPEAN PATENT CEASED THROUGH NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "EP",
        legal_code: "GBPR",
        description: "GB: PATENT REVOKED UNDER ART. 102 OF THE EP CONVENTION DESIGNATING THE UK AS CONTRACTING STATE"
    },
    {
        country_code: "EP",
        legal_code: "GBRH",
        description: "GB: EP (UK) PATENT REINSTATED (GB RULE 100)"
    },
    {
        country_code: "EP",
        legal_code: "GBRI",
        description: "GB: EP (UK) PATENT REINSTATED (GB RULE 110(3)A/1987)"
    },
    {
        country_code: "EP",
        legal_code: "GBRJ",
        description: "GB: REINSTATED UNDER RULE 110(4) - ALTERATION OF TIME LIMITS"
    },
    {
        country_code: "EP",
        legal_code: "GBT",
        description: "GB: TRANSLATION OF EP PATENT FILED (GB SECTION 77(6)(A)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBT8",
        description: "GB: TRANSLATION FILED (GB SECTION 80(3)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBTA",
        description: "GB: TRANSLATION OF AMENDED EP PATENT FILED (GB SECTION 77(6)(B)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBTC",
        description: "GB: CORRECTED TRANSLATION (OF EP PATENT) FILED (GB SECTION 80(3)/1977)"
    },
    {
        country_code: "EP",
        legal_code: "GBTH",
        description: "GB: TRANSLATIONS FILED: AMENDED EUROPEAN PATENTS - CORRECTION"
    },
    {
        country_code: "EP",
        legal_code: "GBV",
        description: "GB: EP PATENT (UK) TREATED AS ALWAYS HAVING BEEN VOID IN ACCORDANCE WITH GB SECTION 77(7)/1977"
    },
    {
        country_code: "EP",
        legal_code: "IECL",
        description: "IE: TRANSLATION FOR EP CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "INTC",
        description: "FORMER COMMUNICATION OF INTENTION TO GRANT CANCELLED"
    },
    {
        country_code: "EP",
        legal_code: "INTG",
        description: "ANNOUNCEMENT OF INTENTION TO GRANT"
    },
    {
        country_code: "EP",
        legal_code: "ITCL",
        description: "IT: TRANSLATION FOR EP CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "ITCP",
        description: "IT: COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "EP",
        legal_code: "ITF",
        description: "IT: TRANSLATION FOR A EP PATENT FILED"
    },
    {
        country_code: "EP",
        legal_code: "ITPR",
        description: "IT: CHANGES IN OWNERSHIP OF A EUROPEAN PATENT"
    },
    {
        country_code: "EP",
        legal_code: "ITTA",
        description: "IT: LAST PAID ANNUAL FEE"
    },
    {
        country_code: "EP",
        legal_code: "K1C0",
        description: "PREVIOUSLY ANNOUNCED CORRECTION OF PATENT APPLICATION CANCELLED"
    },
    {
        country_code: "EP",
        legal_code: "K1C1",
        description: "CORRECTION OF PATENT APPLICATION (TITLE PAGE) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K1C2",
        description: "CORRECTION OF PATENT APPLICATION (PARTIAL REPRINT) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K1C3",
        description: "CORRECTION OF PATENT APPLICATION (COMPLETE REPRINT) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K2",
        description: "CORRECTION OF PATENT SPECIFICATION PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K2C0",
        description: "ANNOUNCED RECTIFICATION CANCELLED"
    },
    {
        country_code: "EP",
        legal_code: "K2C1",
        description: "CORRECTION OF PATENT SPECIFICATION (TITLE PAGE) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K2C2",
        description: "CORRECTION OF PATENT SPECIFICATION (PARTIAL REPRINT) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "K2C3",
        description: "CORRECTION OF PATENT SPECIFICATION (COMPLETE REPRINT) PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "KL",
        description: "CORRECTION LIST"
    },
    {
        country_code: "EP",
        legal_code: "LIM1",
        description: "LIMITATION IS ADMISSIBLE"
    },
    {
        country_code: "EP",
        legal_code: "LIM2",
        description: "LIMITATION IS INADMISSIBLE"
    },
    {
        country_code: "EP",
        legal_code: "LIM3",
        description: "LIMITATION DEEMED NOT TO BE FILED"
    },
    {
        country_code: "EP",
        legal_code: "LIM4",
        description: "LIMITATION DEEMED NOT TO BE FILED, OPPOSITION PENDING OR FILED"
    },
    {
        country_code: "EP",
        legal_code: "LIM5",
        description: "LIMITATION WITHDRAWN"
    },
    {
        country_code: "EP",
        legal_code: "LTIE",
        description: "LT: INVALIDATION OF EUROPEAN PATENT OR PATENT EXTENSION"
    },
    {
        country_code: "EP",
        legal_code: "LTLA",
        description: "LT: LAPSE OF EUROPEAN PATENT OR PATENT EXTENSION"
    },
    {
        country_code: "EP",
        legal_code: "MED",
        description: "IT: SPC for pharmaceutical products: no action taken"
    },
    {
        country_code: "EP",
        legal_code: "MEDA",
        description: "IT: SPC for pharmaceutical products: examined"
    },
    {
        country_code: "EP",
        legal_code: "MEDB",
        description: "IT: SPC for pharmaceutical products: suspended"
    },
    {
        country_code: "EP",
        legal_code: "MEDC",
        description: "IT: SPC for pharmaceutical products: partially granted"
    },
    {
        country_code: "EP",
        legal_code: "MEDD",
        description: "IT: SPC for pharmaceutical products: granted"
    },
    {
        country_code: "EP",
        legal_code: "MEDE",
        description: "IT: SPC for pharmaceutical products: interlocutary refusal"
    },
    {
        country_code: "EP",
        legal_code: "MEDF",
        description: "IT: SPC for pharmaceutical products: office refusal"
    },
    {
        country_code: "EP",
        legal_code: "MEDG",
        description: "IT: SPC for pharmaceutical products: definitive refusal"
    },
    {
        country_code: "EP",
        legal_code: "MEDH",
        description: "IT: SPC for pharmaceutical products: Board of Appeal"
    },
    {
        country_code: "EP",
        legal_code: "MEDI",
        description: "IT: SPC for pharmaceutical products: Court of Cassation"
    },
    {
        country_code: "EP",
        legal_code: "MEDL",
        description: "IT: SPC for pharmaceutical products: Court of Justice"
    },
    {
        country_code: "EP",
        legal_code: "MEDM",
        description: "IT: SPC for pharmaceutical products: Withdrawal of SPC applicatio"
    },
    {
        country_code: "EP",
        legal_code: "MEDN",
        description: "IT: SPC for pharmaceutical products: Annulment of SPC"
    },
    {
        country_code: "EP",
        legal_code: "MEDO",
        description: "IT: SPC for pharmaceutical products: Expiry"
    },
    {
        country_code: "EP",
        legal_code: "MEDP",
        description: "IT: SPC for pharmaceutical products: Renunciation of SPC"
    },
    {
        country_code: "EP",
        legal_code: "NLE",
        description: "NL: NOTIFICATIONS CONCERNING APPLICATIONS"
    },
    {
        country_code: "EP",
        legal_code: "NLR1",
        description: "NL: OPPOSITION HAS BEEN FILED WITH THE EPO"
    },
    {
        country_code: "EP",
        legal_code: "NLR2",
        description: "NL: DECISION OF OPPOSITION"
    },
    {
        country_code: "EP",
        legal_code: "NLR3",
        description: "NL: RECEIPT OF MODIFIED TRANSLATIONS IN THE NETHERLANDS LANGUAGE AFTER AN OPPOSITION PROCEDURE"
    },
    {
        country_code: "EP",
        legal_code: "NLR4",
        description: "NL: RECEIPT OF CORRECTED TRANSLATION IN THE NETHERLANDS LANGUAGE AT THE INITIATIVE OF THE PROPRIETOR OF THE PATENT"
    },
    {
        country_code: "EP",
        legal_code: "NLR5",
        description: "NL: PATENTS IN RESPECT OF WHICH A REQUEST TO PROVIDE A CERTIFICATE OF PRIOR USE HAS BEEN FILED"
    },
    {
        country_code: "EP",
        legal_code: "NLR6",
        description: "NL: PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN ON A REQUEST CONCERNING PRIOR USE"
    },
    {
        country_code: "EP",
        legal_code: "NLS",
        description: "NL: ASSIGNMENTS OF EP-PATENTS"
    },
    {
        country_code: "EP",
        legal_code: "NLT1",
        description: "NL: MODIFICATIONS OF NAMES REGISTERED IN VIRTUE OF DOCUMENTS PRESENTED TO THE PATENT OFFICE PURSUANT TO ART. 16 A, PARAGRAPH 1"
    },
    {
        country_code: "EP",
        legal_code: "NLT2",
        description: "NL: MODIFICATIONS (OF NAMES), TAKEN FROM THE EUROPEAN PATENT PATENT BULLETIN"
    },
    {
        country_code: "EP",
        legal_code: "NLUE",
        description: "NL: LICENCE REGISTERED WITH REGARD TO EUROPEAN PATENTS"
    },
    {
        country_code: "EP",
        legal_code: "NLV1",
        description: "NL: LAPSED OR ANNULED DUE TO FAILURE TO FULFILL THE REQUIREMENTS OF ART. 29P AND 29M OF THE PATENTS ACT; NO LEGAL EFFECT FROM"
    },
    {
        country_code: "EP",
        legal_code: "NLV4",
        description: "NL: LAPSED OR ANULLED DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "EP",
        legal_code: "NLV5",
        description: "NL: ANNULMENT (ART. 75)"
    },
    {
        country_code: "EP",
        legal_code: "NLV6",
        description: "EUROPEAN PATENT SURRENDERED (CF. ARTICLE 48 OR ARTICLE 63 OF THE PATENTS ACT 1995)"
    },
    {
        country_code: "EP",
        legal_code: "NLV7",
        description: "NL: LAPSED BECAUSE OF REACHING THE MAXIM LIFETIME OF A PATENT"
    },
    {
        country_code: "EP",
        legal_code: "NLXE",
        description: "NL: OTHER COMMUNICATIONS CONCERNING EP-PATENTS (PART 3 HEADING XE)"
    },
    {
        country_code: "EP",
        legal_code: "PG25",
        description: "LAPSED IN A CONTRACTING STATE ANNOUNCED VIA POSTGRANT INFORM. FROM NAT. OFFICE TO EPO"
    },
    {
        country_code: "EP",
        legal_code: "PGFP",
        description: "POSTGRANT: ANNUAL FEES PAID TO NATIONAL OFFICE"
    },
    {
        country_code: "EP",
        legal_code: "PGRI",
        description: "POSTGRANT: PATENT REINSTATED IN CONTRACTING STATE"
    },
    {
        country_code: "EP",
        legal_code: "PRVG",
        description: "PETITION FOR REVIEW BY THE ENLARGED BOARD OF APPEAL GRANTED"
    },
    {
        country_code: "EP",
        legal_code: "PRVN",
        description: "PETITION FOR REVIEW BY THE ENLARGED BOARD OF APPEAL NOT GRANTED"
    },
    {
        country_code: "EP",
        legal_code: "R110",
        description: "FILING OF A REQUEST FOR CONVERSION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R11L",
        description: "GRANTING OF A LICENSE (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R11X",
        description: "LEGAL MEANS OF EXECUTION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R16A",
        description: "NEW DOCUMENTS DISCOVERED AFTER COMPLETION OF THE EP-SEARCH REPORT (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R17C",
        description: "DATE OF DESPATCH OF FIRST EXAMINATION REPORT"
    },
    {
        country_code: "EP",
        legal_code: "R17D",
        description: "SEARCH REPORT (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R17P",
        description: "REQUEST FOR EXAMINATION FILED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R18D",
        description: "EP-APPLICATION DEEMED TO BE WITHDRAWN: (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R18R",
        description: "REFUSED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R18W",
        description: "WITHDRAWAL (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R18X",
        description: "RE-ESTABLISHED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R18Z",
        description: "REQUEST FOR RE-ESTABLISHMENT (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R19A",
        description: "STAY OF PROCEEDINGS (CORRECTION)[BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R19F",
        description: "THE RESUMPTION OF A PREVIOUS INCORRECT ANNOUNCEMENT OF A STAY OF PROCEEDINGS (CORRECTION) [BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R19U",
        description: "INTERRUPTION OF PROCEEDINGS (CORRECTION) [BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R19W",
        description: "RESUMPTION AFTER INTERRUPTION OF PROCEEDINGS (CORRECTION) [BEFORE GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R20",
        description: "CORRECTIONS OF A PATENT SPECIFICATION"
    },
    {
        country_code: "EP",
        legal_code: "R25",
        description: "LAPSED IN A CONTRACTING STATE DURING THE OPPOSITION PERIOD (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R26",
        description: "OPPOSITION FILED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R26D",
        description: "OPPOSITION DEEMED NOT TO HAVE BEEN FILED (CORR.)"
    },
    {
        country_code: "EP",
        legal_code: "R26N",
        description: "NO OPPOSITION FILED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R26U",
        description: "INADMISSIBLE OPPOSITION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R27A",
        description: "MAINTAINED AS AMENDED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R27C",
        description: "OPPOSITION FINISHED"
    },
    {
        country_code: "EP",
        legal_code: "R27O",
        description: "OPPOSITION REJECTED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R27W",
        description: "REVOKED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R28",
        description: "RE-ESTABLISHED (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "R28E",
        description: "DATE OF RECEIPT OF REQUEST FOR RE-ESTABLISHMENT OF RIGHTS (ART 122) (CORR.)"
    },
    {
        country_code: "EP",
        legal_code: "R29A",
        description: "SUSPENSION OF PROCEEDINGS (CORRECTION)[AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R29U",
        description: "INTERRUPTION OF PROCEEDINGS (CORRECTION) [AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R29W",
        description: "RESUMPTION AFTER INTERRUPTION OF PROCEEDINGS (CORRECTION)[AFTER GRANT]"
    },
    {
        country_code: "EP",
        legal_code: "R80",
        description: "PUBLIC NOTIFICATION IF THE ADDRESS OF THE ADDRESSEE CANNOT BE ESTABLISHED"
    },
    {
        country_code: "EP",
        legal_code: "RA1",
        description: "DATE AND KIND OF FIRST PUBLICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RA4",
        description: "DATE AND KIND OF SUPPLEMENTARY SEARCH REPORT (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RAC",
        description: "DIVISIONAL APPLICATION (ART. 76) OF: (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RAF",
        description: "SUCCESSIVE APPLICATION (ART. 61) (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RAG",
        description: "HAS SUCCESSIVE APPLICATION (ART. 61) (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RAP1",
        description: "TRANSFER OF RIGHTS OF AN EP APPLICATION"
    },
    {
        country_code: "EP",
        legal_code: "RAP2",
        description: "TRANSFER OF RIGHTS OF AN EP PUBLICATION"
    },
    {
        country_code: "EP",
        legal_code: "RAP3",
        description: "CORRECTION OF THE ADDRESS OR NAME OF APPLICANT (A DOCUMENT)"
    },
    {
        country_code: "EP",
        legal_code: "RAP4",
        description: "CORRECTION OF NAME OR ADDRESS OF PATENT OWNER (B DOCUMENT)"
    },
    {
        country_code: "EP",
        legal_code: "RAX",
        description: "EXTENSION OF THE EUROPEAN PATENT TO (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RB1",
        description: "DATE AND KIND OF SECOND PUBLICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RB2",
        description: "DATE AND KIND OF THIRD PUBLICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RBV",
        description: "DESIGNATED CONTRACTING STATES (CORRECTION):"
    },
    {
        country_code: "EP",
        legal_code: "REF",
        description: "CORRESPONDS TO:"
    },
    {
        country_code: "EP",
        legal_code: "REG",
        description: "REFERENCE TO A NATIONAL CODE"
    },
    {
        country_code: "EP",
        legal_code: "RHK1",
        description: "MAIN CLASSIFICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RHK2",
        description: "MAIN CLASSIFICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RIC1",
        description: "CLASSIFICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RIC2",
        description: "CLASSIFICATION (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RIN1",
        description: "INVENTOR (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RIN2",
        description: "INVENTOR (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RJL1",
        description: "REJECTION OF LIMITATION - SUBSTANTIVE REFUSAL"
    },
    {
        country_code: "EP",
        legal_code: "RJL2",
        description: "REJECTION OF LIMITATION - INADMISSIBLE FOR FORMAL REASONS"
    },
    {
        country_code: "EP",
        legal_code: "RJL3",
        description: "REJECTION OF LIMITATION - NO OR LATE REPLY TO SUBSET REPORT"
    },
    {
        country_code: "EP",
        legal_code: "RJL4",
        description: "REJECTION OF LIMITATION - REQUEST ALLOWED BUT REQUIREMENTS NOT FULFILLED"
    },
    {
        country_code: "EP",
        legal_code: "RTI1",
        description: "TITLE (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RTI2",
        description: "TITLE (CORRECTION)"
    },
    {
        country_code: "EP",
        legal_code: "RVAA",
        description: "DECISION ON REVOCATION REQUEST IS ADMISSIBLE (FOR REVOCATION FILED AFTER OPPOSITION PERIOD)"
    },
    {
        country_code: "EP",
        legal_code: "RVDA",
        description: "DECISION ON REVOCATION REQUEST IS ADMISSIBLE (FOR REVOCATION FILED DURING OPPOSITION PERIOD)"
    },
    {
        country_code: "EP",
        legal_code: "RX1",
        description: "CANCELLATION OF FIRST PUBLICATION"
    },
    {
        country_code: "EP",
        legal_code: "RX2",
        description: "CANCELLATION OF SECOND PUBLICATION"
    },
    {
        country_code: "EP",
        legal_code: "SC4A",
        description: "PT: TRANSLATION IS AVAILABLE"
    },
    {
        country_code: "EP",
        legal_code: "T1",
        description: "DK: TRANSLATION OF THE CLAIMS OF EP PATENT"
    },
    {
        country_code: "EP",
        legal_code: "T2",
        description: "DK: CORRECTED TRANSLATION OF THE CLAIMS OF EP PATENT"
    },
    {
        country_code: "EP",
        legal_code: "T3",
        description: "DK: TRANSLATION OF EP PATENT"
    },
    {
        country_code: "EP",
        legal_code: "T4",
        description: "DK: TRANSLATION OF AMENDED EP PATENT"
    },
    {
        country_code: "EP",
        legal_code: "T5",
        description: "DK: CORRECTED TRANSLATION OF EP PATENT"
    },
    {
        country_code: "EP",
        legal_code: "TCAT",
        description: "AT: TRANSLATION OF PATENT CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "TCNL",
        description: "NL: TRANSLATION OF PATENT CLAIMS FILED"
    },
    {
        country_code: "EP",
        legal_code: "TDAT",
        description: "AT: TRANSLATION OF APPLICATION PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "X",
        description: "DOCUMENT NOT PUBLISHED"
    },
    {
        country_code: "EP",
        legal_code: "X1",
        description: "NO ENTRY UNDER THIS NUMBER"
    },
    {
        country_code: "EP",
        legal_code: "XX",
        description: "MISCELLANEOUS:"
    },
    {
        country_code: "EP",
        legal_code: "ZE",
        description: "NL: CORRECTIONS TO EARLIER ENTRIES IN HEADINGS PE - XE"
    },
    {
        country_code: "ES",
        legal_code: "BA2A",
        description: "PROVISIONAL PROTECTION"
    },
    {
        country_code: "ES",
        legal_code: "CB1K",
        description: "OPPOSITION SUSPENDED"
    },
    {
        country_code: "ES",
        legal_code: "DC2A",
        description: "PATENT MODIFIED"
    },
    {
        country_code: "ES",
        legal_code: "EC2A",
        description: "SEARCH REPORT PUBLISHED"
    },
    {
        country_code: "ES",
        legal_code: "FA1K",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "ES",
        legal_code: "FA2A",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "ES",
        legal_code: "FB1A",
        description: "APPLICATION SUSPENDED"
    },
    {
        country_code: "ES",
        legal_code: "FB1K",
        description: "APPLICATION SUSPENDED"
    },
    {
        country_code: "ES",
        legal_code: "FC1K",
        description: "UTILITY MODEL REFUSED"
    },
    {
        country_code: "ES",
        legal_code: "FC2A",
        description: "GRANT REFUSED"
    },
    {
        country_code: "ES",
        legal_code: "FD1A",
        description: "PATENT LAPSED"
    },
    {
        country_code: "ES",
        legal_code: "FD1K",
        description: "UTILITY MODEL LAPSED"
    },
    {
        country_code: "ES",
        legal_code: "FD2A",
        description: "ANNOUNCEMENT OF LAPSE IN SPAIN"
    },
    {
        country_code: "ES",
        legal_code: "FG1K",
        description: "UTILITY MODEL GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "FG2A",
        description: "DEFINITIVE PROTECTION"
    },
    {
        country_code: "ES",
        legal_code: "GC1A",
        description: "EXPLOITATION CERTIFICATE REGISTERED APPLICATION WITHOUT SEARCH REPORT"
    },
    {
        country_code: "ES",
        legal_code: "GC1K",
        description: "EXPLOITATION CERTIFICATE REGISTERED"
    },
    {
        country_code: "ES",
        legal_code: "GC2A",
        description: "EXPLOITATION CERTIFICATE REGISTERED APPLICATION WITH SEARCH REPORT"
    },
    {
        country_code: "ES",
        legal_code: "GD1A",
        description: "CONTRACTUAL LICENCES"
    },
    {
        country_code: "ES",
        legal_code: "GD1K",
        description: "CONTRACTUAL LICENCES"
    },
    {
        country_code: "ES",
        legal_code: "GD2A",
        description: "CONTRACTUAL LICENCES"
    },
    {
        country_code: "ES",
        legal_code: "MC1A",
        description: "APPLICATION ANNULED"
    },
    {
        country_code: "ES",
        legal_code: "MC1K",
        description: "APPLICATION ANNULED (UTILITY MODEL)"
    },
    {
        country_code: "ES",
        legal_code: "MC2A",
        description: "ANNULMENT"
    },
    {
        country_code: "ES",
        legal_code: "MH1A",
        description: "ABANDONMENT"
    },
    {
        country_code: "ES",
        legal_code: "MH1K",
        description: "ABANDONMENT"
    },
    {
        country_code: "ES",
        legal_code: "MM1K",
        description: "UTILITY MODEL LAPSED"
    },
    {
        country_code: "ES",
        legal_code: "MM4A",
        description: "PATENT LAPSED"
    },
    {
        country_code: "ES",
        legal_code: "NE1A",
        description: "REQUEST FOR RESTORATION"
    },
    {
        country_code: "ES",
        legal_code: "NE1K",
        description: "REQUEST FOR RESTORATION"
    },
    {
        country_code: "ES",
        legal_code: "NE2A",
        description: "REQUEST FOR RESTORATION"
    },
    {
        country_code: "ES",
        legal_code: "NF1A",
        description: "RESTORATION GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "NF1K",
        description: "RESTORATION GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "NF2A",
        description: "RESTORATION AFTER LAPSE (ACC. PAR. 117)"
    },
    {
        country_code: "ES",
        legal_code: "PA1K",
        description: "CONVERSION INTO PATENT"
    },
    {
        country_code: "ES",
        legal_code: "PA2A",
        description: "CONVERSION INTO UTILITY MODEL"
    },
    {
        country_code: "ES",
        legal_code: "PC1A",
        description: "TRANSFER GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "PC1K",
        description: "TRANSFER GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "PC2A",
        description: "TRANSFER GRANTED"
    },
    {
        country_code: "ES",
        legal_code: "PCD",
        description: "TRANSFER REFUSED"
    },
    {
        country_code: "ES",
        legal_code: "QB1K",
        description: "ADMISSION OF OFFERS"
    },
    {
        country_code: "ES",
        legal_code: "QB4A",
        description: "ADMISSION OF OFFERS"
    },
    {
        country_code: "ES",
        legal_code: "QC1K",
        description: "SUSPENDED"
    },
    {
        country_code: "ES",
        legal_code: "QC4A",
        description: "SUSPENDED"
    },
    {
        country_code: "ES",
        legal_code: "RA1A",
        description: "APPEAL LODGED"
    },
    {
        country_code: "ES",
        legal_code: "RA1K",
        description: "APPEAL LODGED"
    },
    {
        country_code: "ES",
        legal_code: "RD1A",
        description: "PATENT SEIZED"
    },
    {
        country_code: "ES",
        legal_code: "RD1K",
        description: "UTILITY MODEL SEIZED"
    },
    {
        country_code: "ES",
        legal_code: "RD2A",
        description: "SEIZURE OF PATENT FREED"
    },
    {
        country_code: "ES",
        legal_code: "RD2K",
        description: "SEIZURE OF UTILITY MODEL FREED"
    },
    {
        country_code: "ES",
        legal_code: "RH1K",
        description: "APPEAL ADMITTED"
    },
    {
        country_code: "ES",
        legal_code: "RH9A",
        description: "APPEAL ADMITTED"
    },
    {
        country_code: "ES",
        legal_code: "RK1K",
        description: "APPEAL REFUSED"
    },
    {
        country_code: "ES",
        legal_code: "RK9A",
        description: "APPEAL REFUSED"
    },
    {
        country_code: "ES",
        legal_code: "RL1A",
        description: "APPEAL RENDERED BY THE COURT"
    },
    {
        country_code: "ES",
        legal_code: "RL1K",
        description: "APPEAL RENDERED"
    },
    {
        country_code: "ES",
        legal_code: "RL2A",
        description: "ANNULEMENT BY COURT DECISION"
    },
    {
        country_code: "ES",
        legal_code: "SA1",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SA4",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SA6",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SB3",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SPCD",
        description: "REJECTION OF AN SPC"
    },
    {
        country_code: "ES",
        legal_code: "SPCE",
        description: "ERRATUM TO AN SPC"
    },
    {
        country_code: "ES",
        legal_code: "SPCF",
        description: "FILING AN SPC"
    },
    {
        country_code: "ES",
        legal_code: "SPCG",
        description: "GRANT OF AN SPC"
    },
    {
        country_code: "ES",
        legal_code: "SPCO",
        description: "OBJECTION AGAINST A DECISION TO AN SPC FILED"
    },
    {
        country_code: "ES",
        legal_code: "SPCP",
        description: "OBJECTION AGAINST A DECISION TO AN SPC REJECTED"
    },
    {
        country_code: "ES",
        legal_code: "SPCQ",
        description: "OBJECTION AGAINST A DECISION TO AN SPC AGREED"
    },
    {
        country_code: "ES",
        legal_code: "SPCR",
        description: "RENOUNCEMENT OF AN SPC"
    },
    {
        country_code: "ES",
        legal_code: "SPCW",
        description: "WITHDRAWAL OF AN SPC APPLICATION"
    },
    {
        country_code: "ES",
        legal_code: "ST1",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "ST3",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SU",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "SY",
        description: "EXPIRATION DATE (SNAPSHOT 920101)"
    },
    {
        country_code: "ES",
        legal_code: "TK1K",
        description: "CORRECTION"
    },
    {
        country_code: "ES",
        legal_code: "TK9A",
        description: "CORRECTION"
    },
    {
        country_code: "FI",
        legal_code: "71AA",
        description: "SECTION 71A (PATENTS ACT) ACCEPTED (REINSTATEMENT AFTER LOSS OF RIGHTS DUE TO MISSING THE PRESCRIBED TIME LIMIT)"
    },
    {
        country_code: "FI",
        legal_code: "AA",
        description: "APPLICATION IS PENDING"
    },
    {
        country_code: "FI",
        legal_code: "BB",
        description: "Publication of examined application"
    },
    {
        country_code: "FI",
        legal_code: "CC",
        description: "Opposition rejected"
    },
    {
        country_code: "FI",
        legal_code: "CD",
        description: "Application refused following opposition"
    },
    {
        country_code: "FI",
        legal_code: "FA",
        description: "Application withdrawn"
    },
    {
        country_code: "FI",
        legal_code: "FAU",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "FI",
        legal_code: "FC",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "FI",
        legal_code: "FCK",
        description: "APPEAL REJECTED"
    },
    {
        country_code: "FI",
        legal_code: "FCKU",
        description: "APPEAL REJECTED"
    },
    {
        country_code: "FI",
        legal_code: "FCU",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "FI",
        legal_code: "FD",
        description: "APPLICATION LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "FDU",
        description: "APPEAL LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "FG",
        description: "Patent granted"
    },
    {
        country_code: "FI",
        legal_code: "FGE",
        description: "EP PATENT VALIDATED IN FINLAND"
    },
    {
        country_code: "FI",
        legal_code: "FGU",
        description: "UTILITY MODEL REGISTERED"
    },
    {
        country_code: "FI",
        legal_code: "GA",
        description: "Application converted for utility model application"
    },
    {
        country_code: "FI",
        legal_code: "GB",
        description: "TRANSFER OR ASSIGMENT OF APPLICATION"
    },
    {
        country_code: "FI",
        legal_code: "HC",
        description: "Name/ Company changed in application"
    },
    {
        country_code: "FI",
        legal_code: "HF",
        description: "Priority amended"
    },
    {
        country_code: "FI",
        legal_code: "MA",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "FI",
        legal_code: "MAE",
        description: "FI-EP PATENT EXPIRED"
    },
    {
        country_code: "FI",
        legal_code: "MAU",
        description: "UTILITY MODEL EXPIRED"
    },
    {
        country_code: "FI",
        legal_code: "MB",
        description: "SPC expired"
    },
    {
        country_code: "FI",
        legal_code: "MD",
        description: "Opposition filed"
    },
    {
        country_code: "FI",
        legal_code: "MDE",
        description: "OPPOSITION FILED IN FINLAND"
    },
    {
        country_code: "FI",
        legal_code: "MDU",
        description: "REQUEST FOR INVALIDATION FILED"
    },
    {
        country_code: "FI",
        legal_code: "MF",
        description: "PATENT CANCELLED"
    },
    {
        country_code: "FI",
        legal_code: "MFD",
        description: "REVOCATION OF PATENT FOLLOWING OPPOSITION"
    },
    {
        country_code: "FI",
        legal_code: "MFDR",
        description: "REVOCATION OF PATENT"
    },
    {
        country_code: "FI",
        legal_code: "MFE",
        description: "FI-EP PATENT INVALIDATED"
    },
    {
        country_code: "FI",
        legal_code: "MFU",
        description: "UTILITY MODEL CANCELLED"
    },
    {
        country_code: "FI",
        legal_code: "MFX",
        description: "TOTAL CANCELLATION BY COURT"
    },
    {
        country_code: "FI",
        legal_code: "MGE",
        description: "REVOKED FOLLOWING OPPOSITION"
    },
    {
        country_code: "FI",
        legal_code: "MH",
        description: "RENOUNCEMENT BY THE OWNER"
    },
    {
        country_code: "FI",
        legal_code: "MHE",
        description: "RENOUNCEMENT BY THE OWNER FOR EP PATENT"
    },
    {
        country_code: "FI",
        legal_code: "ML",
        description: "SPC lapsed"
    },
    {
        country_code: "FI",
        legal_code: "MM",
        description: "PATENT LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "MME",
        description: "FI-EP PATENT LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "MMU",
        description: "UTILITY MODEL LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "NB",
        description: "Patent amended"
    },
    {
        country_code: "FI",
        legal_code: "ND",
        description: "SPC granted"
    },
    {
        country_code: "FI",
        legal_code: "NF",
        description: "Re-establishment of lapsed right"
    },
    {
        country_code: "FI",
        legal_code: "NG",
        description: "Opposition withdrawn"
    },
    {
        country_code: "FI",
        legal_code: "P71A",
        description: "REINSTATMENT ACC. SECT. 71A PATENTS ACT"
    },
    {
        country_code: "FI",
        legal_code: "PA",
        description: "Supplementary protection certificate filed"
    },
    {
        country_code: "FI",
        legal_code: "PC",
        description: "Transfer of assignment of patent"
    },
    {
        country_code: "FI",
        legal_code: "PCU",
        description: "NEW ASSIGNEE OR OWNER (UTILITY MODELS)"
    },
    {
        country_code: "FI",
        legal_code: "QB",
        description: "License granted/ registered"
    },
    {
        country_code: "FI",
        legal_code: "RC",
        description: "PATENT HELD AS PLEDGE"
    },
    {
        country_code: "FI",
        legal_code: "RF",
        description: "APPEAL FILED"
    },
    {
        country_code: "FI",
        legal_code: "RFK",
        description: "APPEAL ACCEPTED"
    },
    {
        country_code: "FI",
        legal_code: "RFKU",
        description: "APPEAL ACCEPTED"
    },
    {
        country_code: "FI",
        legal_code: "RFU",
        description: "APPEAL FILED"
    },
    {
        country_code: "FI",
        legal_code: "SPCF",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE APPLICATION FILED"
    },
    {
        country_code: "FI",
        legal_code: "SPCG",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE SPC GRANTED"
    },
    {
        country_code: "FI",
        legal_code: "SPCL",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE APPLICATION LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "SPCP",
        description: "APPLICATION FOR A SIX MONTH EXTENSION OF AN SPC"
    },
    {
        country_code: "FI",
        legal_code: "SPCR",
        description: "SPC LAPSED"
    },
    {
        country_code: "FI",
        legal_code: "SPCX",
        description: "DURATION OF SUPPLEMENTARY PROTECTION CERTIFICATE RECTIFIED"
    },
    {
        country_code: "FI",
        legal_code: "TC",
        description: "NAME/ COMPANY CHANGED IN PATENT"
    },
    {
        country_code: "FI",
        legal_code: "TCU",
        description: "CHANGE OF NAME OF PATENT OWNER FOR A UTILITY MODEL"
    },
    {
        country_code: "FR",
        legal_code: "AM",
        description: "ACT MODIFYING THE RIGHTS RELATED TO AN APPLICATION OR A PATENT"
    },
    {
        country_code: "FR",
        legal_code: "AN",
        description: "OFFICIAL ADJUDICATION PUBLISHED"
    },
    {
        country_code: "FR",
        legal_code: "AP",
        description: "PETITION FOR PROPERTY CLAIM"
    },
    {
        country_code: "FR",
        legal_code: "AR",
        description: "APPLICATION MADE FOR RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "AS",
        description: "ASSIGNATION FOR PROPERTY CLAIM"
    },
    {
        country_code: "FR",
        legal_code: "AT",
        description: "ANNULMENT OF DECISION OF TRANSFORMATION"
    },
    {
        country_code: "FR",
        legal_code: "AU",
        description: "OTHER ACT AFFECTING THE OWNERSHIP OR EXPLOITATION OF AN INDUSTRIAL PROPERTY RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "AV",
        description: "OTHER ACT AFFECTING THE EXISTENCE OR THE VALIDITY OF AN INDUSTRIAL PROPERTY RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "BD",
        description: "LAPSE CONFIRMED"
    },
    {
        country_code: "FR",
        legal_code: "BR",
        description: "RESTORATION OF RIGHTS"
    },
    {
        country_code: "FR",
        legal_code: "C1",
        description: "APPLICATION FOR CCP FOR PLANT PROTECTION LAID OPEN TO THE PUBLIC"
    },
    {
        country_code: "FR",
        legal_code: "C2",
        description: "APPLICATION FOR CCP FOR PLANT PROTECTION GRANTED"
    },
    {
        country_code: "FR",
        legal_code: "C3",
        description: "APPLICATION FOR CCP FOR PLANT PROTECTION REJECTED"
    },
    {
        country_code: "FR",
        legal_code: "CA",
        description: "CHANGE OF ADDRESS"
    },
    {
        country_code: "FR",
        legal_code: "CB",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION GRANTED (LAW OF 25 JUNE 1990)"
    },
    {
        country_code: "FR",
        legal_code: "CC",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION LAID OPEN TO THE PUBLIC (LAW OF 25 JUNE 1990)"
    },
    {
        country_code: "FR",
        legal_code: "CD",
        description: "CHANGE OF NAME OR COMPANY NAME"
    },
    {
        country_code: "FR",
        legal_code: "CERR",
        description: "CORRECTION AND/OR MODIFICATION FOR SPCS"
    },
    {
        country_code: "FR",
        legal_code: "CJ",
        description: "CHANGE IN LEGAL FORM"
    },
    {
        country_code: "FR",
        legal_code: "CK",
        description: "CORRECTION IN BOPI (FRENCH OFFICIAL JOURNAL): FILED SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "CL",
        description: "CONCESSION TO GRANT LICENSES"
    },
    {
        country_code: "FR",
        legal_code: "CN",
        description: "CHANGE IN JURIDICAL NATURE"
    },
    {
        country_code: "FR",
        legal_code: "CP",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION FILED"
    },
    {
        country_code: "FR",
        legal_code: "CR",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION LAID OPEN TO THE PUBLIC (EEC REGULATION OF 18 JUNE 1992)"
    },
    {
        country_code: "FR",
        legal_code: "CT",
        description: "GRANTED SUPPLEMENTARY CERTIFICATE OF PROTECTION FOR MEDICINE (EEC REGULATION OF 18 JUNE 1992)"
    },
    {
        country_code: "FR",
        legal_code: "CX",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION REJECTED"
    },
    {
        country_code: "FR",
        legal_code: "CY",
        description: "SUPPLEMENTARY CERTIFICATE OF PROTECTION GRANTED (EEC REGULATION OF 18 JUNE 1992)"
    },
    {
        country_code: "FR",
        legal_code: "D1",
        description: "DECISION OF THE DIRECTOR GENERAL TO REPORT THE DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "D2",
        description: "RENUNCIATION DUE TO AN APPEAL"
    },
    {
        country_code: "FR",
        legal_code: "D3",
        description: "DECISION TO REVOKE THE DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "D4",
        description: "BRINGING ABOUT THE DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "D5",
        description: "RENUNCIATION DUE TO AN APPEAL ON RESTAURATION"
    },
    {
        country_code: "FR",
        legal_code: "D6",
        description: "PATENT ENDORSED LICENCES OF RIGHTS"
    },
    {
        country_code: "FR",
        legal_code: "D7",
        description: "WITHDRAWAL FROM PROCEEDINGS AFTER LODGING OF APPEAL BEFORE COUR D'APPEL"
    },
    {
        country_code: "FR",
        legal_code: "D8",
        description: "PARTIAL WITHDRAWAL"
    },
    {
        country_code: "FR",
        legal_code: "D9",
        description: "LICENCE"
    },
    {
        country_code: "FR",
        legal_code: "DA",
        description: "ANNULMENT OF DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "DC",
        description: "DECISION OF THE SUPREME COURT"
    },
    {
        country_code: "FR",
        legal_code: "DD",
        description: "JURIDICAL DECISION CONCERNING DESIGNATION OF THE INVENTOR"
    },
    {
        country_code: "FR",
        legal_code: "DE",
        description: "WITHDRAWAL DUE TO AN ACTION OF RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "DG",
        description: "CANCELLATION OF A LIEN (PLEDGE) DUE TO A JURIDICAL DECISION"
    },
    {
        country_code: "FR",
        legal_code: "DH",
        description: "CONSIDERED AS NULL AND VOID"
    },
    {
        country_code: "FR",
        legal_code: "DI",
        description: "INADMISSIBILITY OF AN ACTION OF RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "DJ",
        description: "FINAL JURIDICAL DECISION DETERMINATING THE RIGHTS RELATED TO AN APPLICATION, PATENT, UTILITY MODEL OR SPC"
    },
    {
        country_code: "FR",
        legal_code: "DL",
        description: "DECISION OF THE DIRECTOR GENERAL TO LEAVE TO MAKE AVAILABLE LICENCES OF RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "DO",
        description: "APPEAL FOR RESTORATION REJECTED"
    },
    {
        country_code: "FR",
        legal_code: "DP",
        description: "PETITION FOR PROPERTY CLAIM"
    },
    {
        country_code: "FR",
        legal_code: "DR",
        description: "DECISION OF THE APPEAL COURT DUE TO AN APPEAL AT LAW AGAINST DECISIONS OF THE DIRECTOR OF THE INPI, EXCEPT DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "DS",
        description: "DECISION OF THE DIRECTOR GENERAL TO STATE ABOUT AN APPEAL"
    },
    {
        country_code: "FR",
        legal_code: "ED",
        description: "APPEAL COURT APPOINTS AN EXPERT REGARDING AN ACTION OF RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "EERR",
        description: "CORRECTION AND/OR MODIFICATIONS ON EUROPEAN PATENTS WHICH HAVE EFFECT OR NO EFFECT IN FRANCE"
    },
    {
        country_code: "FR",
        legal_code: "EF",
        description: "CONVERSION OF A EUROPEAN TO A FRENCH PATENT APPLICATION"
    },
    {
        country_code: "FR",
        legal_code: "EL",
        description: "TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "FR",
        legal_code: "EM",
        description: "CORRECTION OF A MATERIAL ERROR CONCERNING INSCRIPTION IN THE NATIONAL PATENT REGISTER"
    },
    {
        country_code: "FR",
        legal_code: "ER",
        description: "ERRATA LISTED IN THE FRENCH OFFICIAL JOURNAL (BOPI)"
    },
    {
        country_code: "FR",
        legal_code: "ERR",
        description: "CORRECTION"
    },
    {
        country_code: "FR",
        legal_code: "ET4",
        description: "EP REQUESTED - TRANSLATION OF CLAIMS RECEIVED BY INPI"
    },
    {
        country_code: "FR",
        legal_code: "FC",
        description: "FAVOURABLE DECISION OF INPI DIRECTOR GENERAL ON AN APPLICATION FOR RESTAURATION."
    },
    {
        country_code: "FR",
        legal_code: "GC",
        description: "LIEN (PLEDGE) CONSTITUTED"
    },
    {
        country_code: "FR",
        legal_code: "GR",
        description: "LIEN (PLEDGE) CANCELLED DUE TO A COURT DECISION"
    },
    {
        country_code: "FR",
        legal_code: "HG",
        description: "CORRECTION OF CLASSIFICATION"
    },
    {
        country_code: "FR",
        legal_code: "HH1",
        description: "CORRECTION OF TITLE"
    },
    {
        country_code: "FR",
        legal_code: "IC",
        description: "DECISION OF THE DIRECTOR GENERAL TO DECLARE IRRECEIVABLE OR TO REJECT AN APPEAL"
    },
    {
        country_code: "FR",
        legal_code: "JD",
        description: "DIFFERENT FINAL JUDGEMENTS"
    },
    {
        country_code: "FR",
        legal_code: "JE",
        description: "FINAL JURIDIC DECISION AFFECTING THE EXISTENCE OR VALIDITY OF AN INDUSTRIAL PROPERTY RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "JU",
        description: "FINAL JURIDIC DECISION AFFECTING THE OWNERSHIP OR EXPLOITATION OF AN INDUSTRIAL PROPERTY RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "LD",
        description: "LICENCES OF RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "LIMR",
        description: "LIMITATION OF CLAIMS"
    },
    {
        country_code: "FR",
        legal_code: "LR",
        description: "CANCELLATION OF LEAVE TO MAKE AVAILABLE LICENCES OF RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "LT",
        description: "CANCELLATION OF ENTRY OF LICENCES OF RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "MD",
        description: "TRANSFER OF RIGHTS IN CASE OF DEATH"
    },
    {
        country_code: "FR",
        legal_code: "ML",
        description: "CANCELLATION OF DISTRAINT"
    },
    {
        country_code: "FR",
        legal_code: "MS",
        description: "CANCELLATION OF A DISTRAINT ORDER"
    },
    {
        country_code: "FR",
        legal_code: "MT",
        description: "CANCELLATION"
    },
    {
        country_code: "FR",
        legal_code: "MV",
        description: "SUPPRESS THE NOTIFICATION OF THE GRANT"
    },
    {
        country_code: "FR",
        legal_code: "NB",
        description: "NULLIFICATION OF A PATENT"
    },
    {
        country_code: "FR",
        legal_code: "PC",
        description: "APPEAL TO THE SUPREME COURT OF APPEAL"
    },
    {
        country_code: "FR",
        legal_code: "R1",
        description: "APPEAL"
    },
    {
        country_code: "FR",
        legal_code: "RA",
        description: "CANCELLATION OF ACTION MADE FOR RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "RB",
        description: "DECISION OF THE DIRECTOR GENERAL TO REVOKE THE DECISION TO LEAVE TO MAKE AVAILABLE LICENCES OF RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "RC",
        description: "OPPOSITION AGAINST DECISION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "RD",
        description: "RESUMPTION OF PROCEDURE ON THE GRANTING"
    },
    {
        country_code: "FR",
        legal_code: "RE",
        description: "WITHDRAWAL OF PUBLISHED APPLICATION"
    },
    {
        country_code: "FR",
        legal_code: "REFU",
        description: "REFUSAL"
    },
    {
        country_code: "FR",
        legal_code: "RERR",
        description: "CORRECTION AND/OR MODIFICATION IN THE NATIONAL PATENT REGISTER OF FRANCE"
    },
    {
        country_code: "FR",
        legal_code: "RF",
        description: "APPEAL FORMED BEFORE THE COURT OF APPEALS AGAINST A DECISION OF THE DIRECTOR GENERAL"
    },
    {
        country_code: "FR",
        legal_code: "RG",
        description: "LIEN (PLEDGE) CANCELLED"
    },
    {
        country_code: "FR",
        legal_code: "RL",
        description: "NOTICE OF TERMINATION OF A LICENSE"
    },
    {
        country_code: "FR",
        legal_code: "RM",
        description: "CORRECTION OF A MATERIAL ERROR"
    },
    {
        country_code: "FR",
        legal_code: "RN",
        description: "APPLICATION FOR RESTORATION"
    },
    {
        country_code: "FR",
        legal_code: "RP",
        description: "PARTIAL RENUNCIATION"
    },
    {
        country_code: "FR",
        legal_code: "RR",
        description: "WITHDRAWAL OR COMPLETE RENUNCIATION"
    },
    {
        country_code: "FR",
        legal_code: "RS",
        description: "COMPLETE WITHDRAWAL"
    },
    {
        country_code: "FR",
        legal_code: "RT",
        description: "COMPLETE RENUNCIATION"
    },
    {
        country_code: "FR",
        legal_code: "RU",
        description: "APPEAL FORMED BEFORE THE COURT OF APPEALS"
    },
    {
        country_code: "FR",
        legal_code: "SD",
        description: "SUSPENSION OF PROCEDURE ON THE GRANTING"
    },
    {
        country_code: "FR",
        legal_code: "SN",
        description: "DISTRAINT NOTIFIED (IN THE NATIONAL PATENT REGISTER)"
    },
    {
        country_code: "FR",
        legal_code: "SPCC",
        description: "CHANGE OF OWNER'S NAME OR ADDRESS FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCL",
        description: "SUPPLEMENATARY PROTECTION CERTIFICATE LAPSED"
    },
    {
        country_code: "FR",
        legal_code: "SPCM",
        description: "SEIZURE OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCP",
        description: "APPEAL FORMED BEFORE THE COURT OF APPEAL FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCQ",
        description: "FINAL JURIDICAL DECISION DETERMINATING THE RIGHTS RELATED TO A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCS",
        description: "REGISTERED LICENCE FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCT",
        description: "TOTAL TRANSMISSION OF PROPERTY OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCU",
        description: "PARTIAL TRANSMISSION OF PROPERTY OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCV",
        description: "REJECTION OF A PROLONGATION OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "FR",
        legal_code: "SPCW",
        description: "SUPPLEMENTARY PROTECTION CERTICIATE WITHDRAWN"
    },
    {
        country_code: "FR",
        legal_code: "SPCY",
        description: "APPLICATION TO PROLONGATE THE PROTECTION OF AN SPC"
    },
    {
        country_code: "FR",
        legal_code: "SPCZ",
        description: "PROLONGATION OF AN SPC GRANTED"
    },
    {
        country_code: "FR",
        legal_code: "ST",
        description: "NOTIFICATION OF LAPSE"
    },
    {
        country_code: "FR",
        legal_code: "SU",
        description: "TO BE DELETED"
    },
    {
        country_code: "FR",
        legal_code: "TEP",
        description: "EPO PATENT APPLICATION IS TRANSFORMED TO A FRENCH PATENT APPLICATION"
    },
    {
        country_code: "FR",
        legal_code: "TP",
        description: "TRANSMISSION OF PROPERTY"
    },
    {
        country_code: "FR",
        legal_code: "TQ",
        description: "PARTIAL TRANSMISSION OF PROPERTY"
    },
    {
        country_code: "FR",
        legal_code: "TR",
        description: "FINAL REJECTION OF A FRENCH PATENT APPLICATION RESULTING FROM THE CONVERSION OF A EUROPEAN PATENT"
    },
    {
        country_code: "FR",
        legal_code: "VA",
        description: "FINAL JURIDIC DECISION TO TOTALLY ANNUL THE RIGHT"
    },
    {
        country_code: "FR",
        legal_code: "VP",
        description: "DECISION TO CONFIRM THE PARTIAL OR TOTAL VALIDITY OF THE INDUSTRIAL PROPERTY RIGHT"
    },
    {
        country_code: "United",
        legal_code: "Kingdom",
        description: ""
    },
    {
        country_code: "GB",
        legal_code: "123M",
        description: "HEARING REQUESTED AGAINST TERMINATION - SECTION 123"
    },
    {
        country_code: "GB",
        legal_code: "152R",
        description: "RESTORATION OF PATENT. RULE 152"
    },
    {
        country_code: "GB",
        legal_code: "1949",
        description: "PROCEEDINGS UNDER THE PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "210A",
        description: "PROCEEDING UNDER RULE 100 OF THE PATENTS RULES 1982"
    },
    {
        country_code: "GB",
        legal_code: "4140",
        description: "CASE DECIDED ON APPEAL ** APPEAL ALLOWED IN PART (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4141",
        description: "CASE DECIDED BY THE PATENTS APPEAL TRIBUNAL ** GRANT ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4142",
        description: "CASE DECIDED ON APPEAL ** SPECIFICATION AMENDED IN ACCORDANCE WITH THE PATENTS APPEAL TRIBUNAL ORDER (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4143",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4144",
        description: "CASE DECIDED BY THE COMPTROLLER ** NOTICE OF OPPOSITION ABATED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4145",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4146",
        description: "PROCEEDING UNDER SECTION 14 PATENTS ACT 1949 (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4148",
        description: "APPLICATION NOT ENTERTAINED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4149",
        description: "CASE DECIDED BY THE COMPTROLLER ** PROCEEDING TERMINATED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414A",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414B",
        description: "CASE DECIDED BY THE COMPTROLLER ** GRANTS ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414C",
        description: "CASE DECIDED BY THE COMPTROLLER ** GRANTS REFUSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414D",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414E",
        description: "APPLICATION RELINQUISHED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414F",
        description: "NOTICE OF OPPOSITION GIVEN (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414H",
        description: "APPLICATION MADE TO THE COURT OF APPEAL (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414I",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414J",
        description: "OPPOSITION NOT ENTERTAINED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414K",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414L",
        description: "CASE DECIDED ON APPEAL ** GRANT ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414M",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414N",
        description: "CASE DECIDED ON APPEAL ** SPECIFICATION AMENDED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414O",
        description: "OPPOSITION NOT PROCEEDED WITH (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414P",
        description: "CASE DECIDED BY THE PATENTS COURT ** SPECIFICATION AMENDED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414Q",
        description: "CASE DECIDED ON APPEAL ** GRANT REFUSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414R",
        description: "APPLICATION REFUSED BY HIGH COURT (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414U",
        description: "NOTICE OF OPPOSITION ABATED IN ACCORDANCE WITH PARAGRAPH 4(1)(B) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "414V",
        description: "NOTICE OF OPPOSITION ABATED IN ACCORDANCE WITH PARAGRAPH 4(1)(B) PATENTS ACT 1977 ** CASE DECIDED BY THE COMPTROLLER"
    },
    {
        country_code: "GB",
        legal_code: "414W",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL WITHDRAWN (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414X",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414Y",
        description: "CASE DECIDED ON APPEAL ** APPEAL DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "414Z",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL WITHDRAWN (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "415",
        description: "SPECIFICATION AMENDED (SECT. 15/1949)"
    },
    {
        country_code: "GB",
        legal_code: "416",
        description: "PROCEEDING UNDER SECTION 16 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "416A",
        description: "PROCEEDING UNDER SECTION 16(3) PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "423",
        description: "PETITION WITHDRAWN (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423A",
        description: "PETITION WITHDRAWN AND UNDERTAKING GIVEN NOT TO RE-APPLY (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423B",
        description: "APPLICATION FOR LEAVE TO PRESENT PETITION OUT OF TIME WITHDRAWN, UNDERTAKING GIVEN NOT TO RE-APPLY (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423C",
        description: "TERM OF PATENT EXTENDED BY THE PATENTS COURT (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423D",
        description: "PETITION DISMISSED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423E",
        description: "TERM OF PATENT EXTENDED BY THE HIGH COURT (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423F",
        description: "PATENT EXTENDED UNDER SECTION 23 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "423G",
        description: "PROCEEDING UNDER SECTION 23 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "423H",
        description: "TERM OF PATENT EXTENDED BY THE COURT (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423I",
        description: "LEAVE TO PRESENT PETITION OUT OF TIME REFUSED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423J",
        description: "NOTICE OF INTENTION TO PRESENT A PETITION TO THE COURT (SECT. 23 AND 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423K",
        description: "TERM OF PATENT EXTENDED BY THE HIGH COURT (SECT. 23 AND 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423N",
        description: "PETITION NOT TO BE PRESENTED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423O",
        description: "PETITION EXTENDED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423P",
        description: "NOTICE OF INTENTION TO PRESENT A PETITION (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423R",
        description: "PETITION FOR EXTENSION OF TERM OF LETTERS PATENT WITHDRAWN (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423S",
        description: "PETITION NOT PRESENTED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423T",
        description: "TERM OF PATENT EXTENDED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "423X",
        description: "PATENT EXTENDED (SECT. 23/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4241",
        description: "NOTICE OF INTENTION TO APPLY BY PETITION TO THE HIGH COURT FOR AN ORDER EXTENDING THE TERM OF A PATENT UNDER SECT. 24 (PATENTS ACT 1949)"
    },
    {
        country_code: "GB",
        legal_code: "4242",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL LODGED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4243",
        description: "OPPOSITION LODGED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4244",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ENTERED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424A",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424B",
        description: "CASE DECIDED ON APPEAL ** APPLICATION FOR EXTENSION OF TERM REFUSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424C",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL ** DISMISSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424D",
        description: "APPLICATION TO THE COMPTROLLER (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424E",
        description: "APPLICATION FOR EXTENSION OF TERM REFUSED BY THE COMPTROLLER (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424F",
        description: "TERM OF PATENT EXTENDED BY THE COMPTROLLER (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424G",
        description: "APPEAL TO THE PATENTS APPEAL TRIBUNAL DISMISSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424H",
        description: "PROCEEDING BEFORE COURT OF APPEAL DISCONTINUED ** APPLICATION FOR EXTENSION OF TERM REFUSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424I",
        description: "APPLICATION MADE TO THE COMPTROLLER FOR EXTENSION OF TERM (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424J",
        description: "APPLICATION REFUSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424K",
        description: "APPLICATION MADE TO THE COURT OF APPEAL (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424L",
        description: "APPLICATION REFUSED ** SUBJECT TO APPEAL (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424M",
        description: "APPLICATION TO THE COURT OF APPEAL ** WITHDRAWN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424O",
        description: "EXTENSION OF TERM REFUSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424P",
        description: "NOTICE OF OPPOSITION GIVEN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424Q",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL WITHDRAWN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424S",
        description: "CASE DECIDED ON APPEAL (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424T",
        description: "PETITION DISMISSED (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424U",
        description: "EXTENSION OF TERM REFUSED - SUBJECT TO APPEAL (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424V",
        description: "TERM OF PATENT EXTENDED BY THE HIGH COURT (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424W",
        description: "APPEAL WITHDRAWN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424X",
        description: "OPPOSITION WITHDRAWN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424Y",
        description: "APPLICATION WITHDRAWN (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "424Z",
        description: "APPLICATION REFERRED TO THE COURT (SECT. 24/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425A",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425B",
        description: "APPEAL TO THE COURT OF APPEAL DISMISSED (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425C",
        description: "APPLICATION MADE TO THE COMPTROLLER FOR EXTENSION OF TERM (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425D",
        description: "APPLICATION REFUSED ** OPEN TO APPEAL (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425E",
        description: "DISMISSED - OPEN TO APPEAL (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "425F",
        description: "APPLICATION TO THE COMPTROLLER (SECT. 25/1949)"
    },
    {
        country_code: "GB",
        legal_code: "426",
        description: "ORDER MADE REVOKING PATENT AND GRANTING PATENT OF ADDITION IN LIEU THEREOF (SECT. 26(2)/1949)"
    },
    {
        country_code: "GB",
        legal_code: "426A",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 26(2)/1949)"
    },
    {
        country_code: "GB",
        legal_code: "426C",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 26(5)(B)/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427A",
        description: "APPLICATION MADE FOR RESTORATION (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427B",
        description: "ORDER MADE RESTORING THE PATENT (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427C",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427D",
        description: "APPLICATION NOT ENTERTAINED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427E",
        description: "ORDER RESTORING THE UNDERMENTIONED PATENT DATED ... (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427F",
        description: "APPLICATION ABANDONED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427G",
        description: "APPLICATION FOR THE RESTORATION OF LAPSED PATENTS (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427H",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL ** WITHDRAWN (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427I",
        description: "ORDER MADE REVOKING THE UNDERMENTIONED PATENT DATED ... (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427L",
        description: "APPLICATION WITHDRAWN (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427M",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427N",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427P",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL ALLOWED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427R",
        description: "APPLICATION REFUSED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427T",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427U",
        description: "CASE DECIDED ON APPEAL ** APPLICATION REFUSED (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427W",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 27/1949)"
    },
    {
        country_code: "GB",
        legal_code: "427X",
        description: "NOTICE OF OPPOSITION WITHDRAWN - AMENDMENT OF SPECIFICATION AFTER GRANT"
    },
    {
        country_code: "GB",
        legal_code: "428",
        description: "ORDER MADE FOR SEALING PATENT (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428A",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428B",
        description: "APPLICATION NOW OPEN TO OPPOSITION (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428C",
        description: "APPLICATION NOT ENTERTAINED (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428D",
        description: "DEEMED TO BE ABANDONED (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428E",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428F",
        description: "APPLICATION ABANDONED (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428L",
        description: "APPEAL TO COURT OF APPEAL (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "428S",
        description: "APPLICATION MADE FOR THE SEALING OF A PATENT (SECT. 28/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4292",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION ** APPEAL TO THE PATENTS APPEAL TRIBUNAL (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4293",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT SURRENDERED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4294",
        description: "APPLICATION TO AMEND REFUSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4295",
        description: "APPLICATION FOR AMENDMENT WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4296",
        description: "APPLICATION TO AMEND THE SPECIFICATION ABANDONED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4297",
        description: "APPEAL DISMISSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4298",
        description: "CASE DECIDED ON APPEAL ** APPLICATION TO AMEND THE SPECIFICATION REFUSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4299",
        description: "APPLICATION TO THE PATENTS APPEAL COURT (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429A",
        description: "APPLICATION MADE FOR AMENDMENT OF SPECIFICATION (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429B",
        description: "APPLICATION TO AMEND ABANDONED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429C",
        description: "APPLICATION TO AMEND THE SPECIFICATION WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429D",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429E",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429F",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429G",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL ALLOWED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429H",
        description: "APPLICATION (MADE) FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429I",
        description: "APPLICATION REFUSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429J",
        description: "APPLICATION WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429K",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429L",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429M",
        description: "APPLICATION MADE AND SPECIFICATION AMENDED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429N",
        description: "APPLICATION ABANDONED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429O",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429P",
        description: "SPECIFICATION AMENDED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429Q",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429R",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429S",
        description: "APPLICATION FOR FURTHER AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429T",
        description: "APPLICATION TERMINATED BY VOLUNTARY SURRENDER OF THE PATENT (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429U",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429V",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION TO AMEND WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429W",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL WITHDRAWN (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429X",
        description: "PATENT REVOKED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429Y",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL ALLOWED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "429Z",
        description: "CASE DECIDED BY THE COURT OF APPEAL ** SPECIFICATION FURTHER AMENDED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430",
        description: "PROCEEDING UNDER SECTION 30 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "430A",
        description: "SPECIFICATION AMENDED (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430B",
        description: "APPLICATION (MADE) FOR AMENDMENT OF SPECIFICATION (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430C",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION WITHDRAWN (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430D",
        description: "PATENT REVOKED (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430E",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION DISCONTINUED (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430F",
        description: "APPLICATION DISCONTINUED (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430G",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOT PROCEEDED WITH (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430H",
        description: "APPLICATION FOR AMENDMENT OF COMPLETE SPECIFICATION (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430I",
        description: "APPLICATION WITHDRAWN (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430J",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS BEFORE THE COURT (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430K",
        description: "ADVERTISEMENT OF INTENDED AMENDMENT (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430L",
        description: "APPLICATION REFUSED BY ORDER DATED ... (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430N",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430O",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "430X",
        description: "TREATED AS WITHDRAWN (SECT. 30/1949)"
    },
    {
        country_code: "GB",
        legal_code: "432",
        description: "PATENT REVOKED (SECT. 32/1949)"
    },
    {
        country_code: "GB",
        legal_code: "432A",
        description: "PROCEEDING UNDER SECTION 32 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "432B",
        description: "PATENT REVOKED BY ORDER OF HIGH COURT (SECT. 32/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433",
        description: "PROCEEDING TERMINATED BY VOLUNTARY SURRENDER OF THE PATENT (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4331",
        description: "APPLICATION TREATED AS NOT HAVING BEEN MADE (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4332",
        description: "ORDER MADE REVOKING THE UNDERMENTIONED PATENT (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4333",
        description: "PROCEEDING TERMINATED BY SURRENDER OF PATENT UNDER SECTION 34 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "4334",
        description: "PATENT AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4335",
        description: "APPEAL BY PATENTEES ALLOWED. APPLICATION FOR REVOCATION REMITTED TO COMPTROLLER FOR CONSIDERATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4336",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION NOT PROCEEDED WITH (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4337",
        description: "APPLICATION MADE FOR REVOCATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4338",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL ALLOWED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4339",
        description: "APPLICATION NOT ENTERTAINED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433A",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433B",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT REVOKED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433C",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433D",
        description: "APPLICATION MADE FOR REVOCATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433E",
        description: "CASE DECIDED ON APPEAL ** PATENT AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433F",
        description: "CASE DECIDED ON APPEAL ** PATENT REVOKED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433G",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433H",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL DISMISSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433I",
        description: "CASE DECIDED ON APPEAL ** APPLICATION REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433K",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433L",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433M",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433N",
        description: "APPLICATION WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433O",
        description: "APPLICATION MADE TO THE COURT OF APPEAL (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433P",
        description: "PATENT REVOKED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433Q",
        description: "CASE DECIDED ON APPEAL ** APPLICATION FOR REVOCATION REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433R",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433S",
        description: "CASE DECIDED ON APPEAL ** SPECIFICATION AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433T",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433U",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL ** WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433V",
        description: "APPLICATION MADE TO THE PATENTS COURT ** PATENT REVOKED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433W",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433X",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL ALLOWED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433Y",
        description: "APPLICATION FOR REVOCATION DISCONTINUED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "433Z",
        description: "CASE DECIDED BY THE COURT OF APPEAL ** SPECIFICATION TO BE AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434A",
        description: "OFFER TO SURRENDER (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434B",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT REVOKED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434C",
        description: "PATENT REVOKED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434D",
        description: "OFFER TO SURRENDER ACCEPTED ** PATENT REVOKED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434E",
        description: "OFFER TO SURRENDER ** PATENT REVOKED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434F",
        description: "WITHDRAWAL OF OFFER TO SURRENDER ALLOWED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434G",
        description: "PROCEEDING TERMINATED BY SURRENDER OF PATENT UNDER SECTION 34 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "434I",
        description: "ORDER MADE REVOKING THE UNDERMENTIONED PATENT (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434J",
        description: "OFFER TO SURRENDER ACCEPTED ** PATENT REFUSED (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434K",
        description: "PROCEEDING TERMINATED BY SURRENDER OF PATENT UNDER SECTION 34 PATENTS ACT 1949 ** PATENT REVOKED"
    },
    {
        country_code: "GB",
        legal_code: "434L",
        description: "CASE DECIDED BY THE COMPTROLLER ** ORDER MADE REVOKING THE UNDERMENTIONED PATENT (SECT. 34/1949)"
    },
    {
        country_code: "GB",
        legal_code: "434M",
        description: "PROCEEDING UNDER SECTION 34 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "435",
        description: "PATENT ENDORSED 'LICENCES OF RIGHT' ON THE DATE SPECIFIED (SECT. 35/1949)"
    },
    {
        country_code: "GB",
        legal_code: "436",
        description: "APPLICATION FOR CANCELLATION OF ENDORSEMENT 'LICENCES OF RIGHT' (SECT. 36/1949)"
    },
    {
        country_code: "GB",
        legal_code: "4361",
        description: "APPLICATION UNDER SECTION 36(1) PATENTS ACT 1949 FOR CANCELLATION OF 'LICENCES OF RIGHT'"
    },
    {
        country_code: "GB",
        legal_code: "4365",
        description: "PROCEEDING UNDER SECTION 36(5) PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "436A",
        description: "OPPOSITION FILED TO APPLICATION FOR CANCELLATION OF ENDORSEMENT 'LICENCES OF RIGHT' (SECT. 36/1949)"
    },
    {
        country_code: "GB",
        legal_code: "436C",
        description: "ENDORSEMENT FOR 'LICENCES OF RIGHT' CANCELLED (SECT. 36/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437",
        description: "PROCEEDING UNDER SECTION 37 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "437A",
        description: "APPLICATION WITHDRAWN (SECT. 37/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437B",
        description: "ORDER MADE FOR A LICENCE (SECT. 37/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437C",
        description: "APPLICATION REFUSED (SECT. 37/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437D",
        description: "CASE DECIDED ON APPEAL ** ORDER MADE FOR GRANT OF LICENCE TO ... (SECT. 37/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437E",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 37/1949)"
    },
    {
        country_code: "GB",
        legal_code: "437W",
        description: "APPLICATION WITHDRAWN (SECT. 37 AND 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "43A6",
        description: "PATENT REVOKED (SECT. 30 AND 61/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441A",
        description: "APPLICATION REFUSED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441B",
        description: "APPLICATION WITHDRAWN (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441C",
        description: "CASE DECIDED ON APPEAL (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441D",
        description: "APPLICATION MADE TO THE PATENTS APPEAL TRIBUNAL (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441E",
        description: "CASE DECIDED ON APPEAL ** LICENCE GRANTED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441F",
        description: "LICENCE GRANTED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441G",
        description: "ORDER MADE FOR A LICENCE GRANTED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441H",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ENTERED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441I",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL DISMISSED (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "441P",
        description: "PROCEEDING UNDER SECTION 41 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "441W",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL WITHDRAWN (SECT. 41/1949)"
    },
    {
        country_code: "GB",
        legal_code: "461",
        description: "PATENT REVOKED (SECT. 61/1949)"
    },
    {
        country_code: "GB",
        legal_code: "475",
        description: "PROCEEDING UNDER SECTION 75 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "475A",
        description: "APPLICATION FOR AMENDMENT OF EUROPEAN PATENT ENTITLED"
    },
    {
        country_code: "GB",
        legal_code: "476",
        description: "APPLICATION FOR CORRECTION OF CLERICAL ERRORS NOW OPEN TO OPPOSITION (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476A",
        description: "CORRECTION ALLOWED (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476B",
        description: "APPLICATION TO AMEND WITHDRAWN (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476C",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476D",
        description: "PROCEEDING UNDER SECTION 76 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "476E",
        description: "SEE SECTION 14 PROCEEDING (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476F",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476G",
        description: "CASE DECIDED BY THE COMPTROLLER ** CORRECTION ALLOWED (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476H",
        description: "APPLICATION MADE FOR CORRECTION OF ERROR (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "476I",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION CORRECTED (SECT. 76/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48A",
        description: "SPECIFICATION AMENDED BY DISCLAIMER (SECT. 8/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48A9",
        description: "REFERENCE INSERTED (SECT. 8 AND 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48B",
        description: "SPECIFICATION AMENDED BY DISCLAIMER ** SPECIFICATION AMENDED (SECT. 8/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48B9",
        description: "SPECIFICATION AMENDED (SECT. 8 AND 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48C",
        description: "PROCEEDING UNDER SECTION 8 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "48D",
        description: "REFERENCE DELETED (SECT. 8/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48R",
        description: "REFERENCE INSERTED (SECT. 8/1949)"
    },
    {
        country_code: "GB",
        legal_code: "48S",
        description: "SPECIFICATION AMENDED (SECT. 8/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49",
        description: "PROCEEDING UNDER SECTION 9 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "49A",
        description: "SPECIFICATION INSERTED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49B",
        description: "SPECIFICATION AMENDED BY DISCLAIMER ** REFERENCES INSERTED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49C",
        description: "GRANT ALLOWED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49D",
        description: "REFERENCE DELETED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49R",
        description: "REFERENCE INSERTED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "49S",
        description: "SPECIFICATION AMENDED (SECT. 9/1949)"
    },
    {
        country_code: "GB",
        legal_code: "553",
        description: "PATENT SEALED (RULE 153/1958)"
    },
    {
        country_code: "GB",
        legal_code: "595",
        description: "CASE DECIDED BY THE COMPTROLLER (RULE 95(3)/1958)"
    },
    {
        country_code: "GB",
        legal_code: "6152",
        description: "AMENDMENT UNDER RULE 152 OF THE PATENTS RULES 1968"
    },
    {
        country_code: "GB",
        legal_code: "652A",
        description: "PROCEEDING UNDER RULE 152 OF THE PATENTS RULES 1968"
    },
    {
        country_code: "GB",
        legal_code: "694A",
        description: "CASE DECIDED BY THE COMPTROLLER (RULE 94(3)/1968)"
    },
    {
        country_code: "GB",
        legal_code: "694B",
        description: "PROCEEDING UNDER RULE 94(3) OF THE PATENTS RULES 1968"
    },
    {
        country_code: "GB",
        legal_code: "694C",
        description: "CASE DECIDED BY THE COMPTROLLER ** AMENDMENT FOR PATENT, ADDING FULL ASSIGNMENT DETAILS (RULE 94(3)/1968)"
    },
    {
        country_code: "GB",
        legal_code: "694R",
        description: "APPLICATION REFUSED (RULE 94(3)/1968)"
    },
    {
        country_code: "GB",
        legal_code: "701A",
        description: "PROCEEDING UNDER SCHEDULE 1 PARAGRAPH 4A OF THE PATENTS ACT 1977 ** APPLICATION MADE TO THE PATENTS COURT"
    },
    {
        country_code: "GB",
        legal_code: "701B",
        description: "APPLICATION TO THE COURT OF APPEAL (SECT. 1(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "701C",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 1(1)A+B+C/1977)"
    },
    {
        country_code: "GB",
        legal_code: "701D",
        description: "APPEAL TO THE PATENTS COURT DISMISSED (SECT. 1(1),14(5),76/1977)"
    },
    {
        country_code: "GB",
        legal_code: "701L",
        description: "APPEAL TO THE PATENTS COURT LODGED (SECT. 1/1977)"
    },
    {
        country_code: "GB",
        legal_code: "704A",
        description: "DECLARATION THAT LICENCE IS NOT AVAILABLE AS OF RIGHT FOR AN EXCEPTED USE (PAR. 4A/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708A",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 8(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708B",
        description: "PROCEEDING UNDER SECTION 8(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708C",
        description: "PROCEEDING UNDER SECTION 8(1) AND 12(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708D",
        description: "PROCEEDING UNDER SECTION 8(1)(A) OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708E",
        description: "PROCEEDING UNDER SECTION 8(1)(NOW 37(1)) OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708F",
        description: "PROCEEDING UNDER SECTION 8(1) AND (3) OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708G",
        description: "REFERENCES DECIDED (SECT. 8/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708H",
        description: "DETERMINATION BEFORE GRANT OF UK ENTITLEMENT (SECTION 8(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708I",
        description: "REFERENCE UNDER SECT. 8(1), REFERNCE WITHDRAWN"
    },
    {
        country_code: "GB",
        legal_code: "708J",
        description: "DECLINED TO DEAL WITH REFERENCE - SECTION 8(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "708K",
        description: "REFERENCES ALLOWED BY DECISION (SECT. 8/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708P",
        description: "REFERENCE UNDER SECTION 8(1) NOT PROCEED WITH"
    },
    {
        country_code: "GB",
        legal_code: "708R",
        description: "REFERENCE REFUSED (SECT. 8/1977)"
    },
    {
        country_code: "GB",
        legal_code: "708W",
        description: "APPEAL WITHDRAWN (SECT. 8/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7102",
        description: "PATENT REVOKED UNDER ART. 102 OF THE EP CONVENTION DESIGNATING THE UK AS CONTRACTING STATE"
    },
    {
        country_code: "GB",
        legal_code: "710A",
        description: "PROCEEDING UNDER SECTION 10 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "710B",
        description: "REQUEST OF ALTER TIME LIMITS"
    },
    {
        country_code: "GB",
        legal_code: "710C",
        description: "APPEAL TO PATENTS COURT (SECT. 10/1977)"
    },
    {
        country_code: "GB",
        legal_code: "710D",
        description: "REQUEST WITHDRAWN - SECT. 10 REQUEST BY JOINT APPLICANTS FOR DIRECTIONS"
    },
    {
        country_code: "GB",
        legal_code: "711",
        description: "PROCEEDING UNDER SECTION 117 (PATENTS ACT 1997) CORRECTION OF ERRORS IN PATENTS AND APPLICATIONS"
    },
    {
        country_code: "GB",
        legal_code: "7117",
        description: "APPLICATION TREATED AS WITHDRAWN (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7118",
        description: "APPLICATION TREATED AS REDUNDANT (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711A",
        description: "PROCEEDING UNDER SECTION 117(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "711B",
        description: "APPLICATION MADE FOR CORRECTION OF ERROR (SECT. 117/77)"
    },
    {
        country_code: "GB",
        legal_code: "711C",
        description: "APPLICATION ALLOWED (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711D",
        description: "APPLICATION TO COMPTROLLER (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711E",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION CORRECTED (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711F",
        description: "CASE DECIDED BY THE COMPTROLLER ** REQUEST WITHDRAWN (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711G",
        description: "CORRECTION ALLOWED (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711H",
        description: "CASE DECIDED BY THE COMPTR. ** CORRECTION ALLOWED (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711I",
        description: "APPLICATION DEEMED WITHDRAWN (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711J",
        description: "APPLICATION ALLOWED - CORRECTION OF IRREGULARITIES (RULE 100)"
    },
    {
        country_code: "GB",
        legal_code: "711K",
        description: "REQUEST FOR CORRECTION NOT PROCEED WITH (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711L",
        description: "APPL. MADE FOR CORRECTION OF ERROR (SECT. 117/77) NOW OPEN TO OPPOSITION"
    },
    {
        country_code: "GB",
        legal_code: "711M",
        description: "APPLICATION ALLOWED - CORRECTION OF IRREGULARITIES (RULE 100)"
    },
    {
        country_code: "GB",
        legal_code: "711O",
        description: "APPLICATION OPEN TO OPPOSITION (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "711P",
        description: "CASES CORRECTED BEFORE THE EPO"
    },
    {
        country_code: "GB",
        legal_code: "711Q",
        description: "APPEALS LODGED - SECTION 117"
    },
    {
        country_code: "GB",
        legal_code: "711R",
        description: "APPEAL WITHDRAWN - SECTION 117"
    },
    {
        country_code: "GB",
        legal_code: "711S",
        description: "EXTENSION APPLICATION - SECTION 117"
    },
    {
        country_code: "GB",
        legal_code: "711T",
        description: "EXTENSION ALLOWED - SECTION 117"
    },
    {
        country_code: "GB",
        legal_code: "711U",
        description: "PRODEEDINGS UNDER SECTION 117 (PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "711Z",
        description: "ERRATUM - APPLIC. NOW OPEN TO OPPOSITION - SECT. 117"
    },
    {
        country_code: "GB",
        legal_code: "712A",
        description: "APPLICATION DEEMED WITHDRAWN (SECT. 12(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "712B",
        description: "PROCEEDING UNDER SECTION 12(4) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "712C",
        description: "PROCEEDING UNDER SECTION 12(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "712D",
        description: "PROCEEDING UNDER SECTION 12 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "712E",
        description: "PROCEEDING UNDER SECTION 12(1) AND (3) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "712F",
        description: "DETERMINATION OF FOREIGN ENTITLEMENT (SECTION 12(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "712G",
        description: "DETERMINATION OF FOREIGN ENTITLEMENT (SECT. 12(1)/1977) WITHDRAWN"
    },
    {
        country_code: "GB",
        legal_code: "712I",
        description: "APPEAL TO PATENTS COURT LODGED (CECT. 12(1)(A)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "712J",
        description: "REFERENCE DECIDED BY THE COMPTROLLER - REF. UNDER SECT. 12(1) DETERMINATION OF FOREIGN ENTITLEMENT"
    },
    {
        country_code: "GB",
        legal_code: "712K",
        description: "REFERENCE COMPTROLLER HAS DECLINED TO DEAL - REF. UNDER SECT. 12(1) DETERMINATION OF FOREIGN ENTITLEMENT"
    },
    {
        country_code: "GB",
        legal_code: "712L",
        description: "REFERENCE TREATED AS WITHDRAWN - SECTION 12(1)"
    },
    {
        country_code: "GB",
        legal_code: "712M",
        description: "APPEAL DISMISSED - SECTION 12(1)"
    },
    {
        country_code: "GB",
        legal_code: "7131",
        description: "MENTION OF INVENTOR (SECT. 13(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "713A",
        description: "PROCEEDING UNDER SECTION 13 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "713B",
        description: "PROCEEDING UNDER SECTION 13(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "713C",
        description: "PROCEEDING UNDER SECTION 13(3) OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "713D",
        description: "PROC. UNDER SECT. 13(1) PAT. ACT 1977 ** APPL. FILED"
    },
    {
        country_code: "GB",
        legal_code: "713E",
        description: "PROCEEDING UNDER SECTION 13(1) AND 13(3) OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "713F",
        description: "APPLICATION FOR MENTION OF INVENTOR (SECT. 13(1)/1977) ALLOWED"
    },
    {
        country_code: "GB",
        legal_code: "713G",
        description: "APPLICATION FOR MENTION OF INVENTOR (SECT. 13(1)/1977) REFUSED"
    },
    {
        country_code: "GB",
        legal_code: "713H",
        description: "APPLICATION FILED FOR A PERSON NOT TO BE MENTIONED AS AN INVENTOR - SECTION 13(3) PAT. ACTS 1972"
    },
    {
        country_code: "GB",
        legal_code: "713J",
        description: "APPLICATION WITHDRAWN - UNDER SECT. 13(3) FOR A PERSON NOT TO BE MENTIONED AS INVENTOR"
    },
    {
        country_code: "GB",
        legal_code: "713K",
        description: "REFERENCE WITHDRAWN - APPLIC. FOR INVENTOR TO BE MENTIONED UNDER SECT. 13(1)"
    },
    {
        country_code: "GB",
        legal_code: "713L",
        description: "APPLICATION WITHDRAWN - SECTION 13(1)"
    },
    {
        country_code: "GB",
        legal_code: "713M",
        description: "REFERENCE FILED - DETERMINATION OF FOREIGN ENTITLEMENT - SECTION 13"
    },
    {
        country_code: "GB",
        legal_code: "714A",
        description: "APPLICATION TO THE COURT OF APPEAL (SECT. 14/1977)"
    },
    {
        country_code: "GB",
        legal_code: "714B",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 14(5)C+D/1977)"
    },
    {
        country_code: "GB",
        legal_code: "715F",
        description: "APPEAL TO THE PATENTS COURT LODGED (SECT. 15/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7173",
        description: "APPEAL TO THE PATENTS COURT DISMISSED (SECT. 17(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "717A",
        description: "APPL. MADE TO THE PATENTS COURT (SECT. 17(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "717J",
        description: "APPEAL TO THE PATENTS COURT ALLOWED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "717W",
        description: "APPLICATION WITHDRAWN (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "718",
        description: "REFUSAL OF AMENDM. OFFERED AND OF UNAMENDED SPEC. ** APPL. MADE TO THE PAT. COURT (SECT. 18(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "718A",
        description: "APPEAL LODGED TO THE PATENT COURT - SECT. 18(3)"
    },
    {
        country_code: "GB",
        legal_code: "718D",
        description: "PROC. UNDER SECT. 18(4) PAT. ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "718E",
        description: "APPEAL TO THE PATENTS COURT *** DISMISSED"
    },
    {
        country_code: "GB",
        legal_code: "718L",
        description: "APPEAL LODGED - SECT 18(3)"
    },
    {
        country_code: "GB",
        legal_code: "720A",
        description: "REINSTATEMENT OF APPLICATION (PATENTS ACT 1977, SECTION 20(2)A)"
    },
    {
        country_code: "GB",
        legal_code: "7222",
        description: "APPLICATION FOR REVOCATION, PETITION LODGED IN THE COURT (SECT. 22/1977)"
    },
    {
        country_code: "GB",
        legal_code: "725A",
        description: "RENEWAL OF PATENTS ** APPEAL TO THE PATENTS COURT LODGED (SECT. 25/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727",
        description: "APPLICATION MADE FOR AMENDMENT OF SPECIFICATION (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7275",
        description: "APPLICATION TO COMPTROLLER FOR REVOCATION OF PATENT AND AMENDMENT OF SPECIFICATION THEREOF (SECT. 72 AND 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7276",
        description: "COUNTER CLAIM FOR REVOCATION LODGED IN THE PAT. COURT (SECTION 72)"
    },
    {
        country_code: "GB",
        legal_code: "727A",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727B",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727C",
        description: "APPLICATION TO AMEND THE SPECIFICATION WITHDRAWN (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727D",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727E",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727F",
        description: "APPLICATION FOR FURTHER AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727G",
        description: "PROCEEDING UNDER SECTION 27(5) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "727H",
        description: "SPECIFICATION AMENDED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727I",
        description: "AMENDMENT TO SPECIFICATION STAYED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727J",
        description: "APPLICATION WITHDRAWN (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727K",
        description: "PROCEEDING UNDER SECTION 27 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "727L",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION TO AMEND THE SPECIFICATION REFUSED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727M",
        description: "DECISION ISSUED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727N",
        description: "AMENDMENT AFTER SPECIFICATION OF GRANT ERRATUM"
    },
    {
        country_code: "GB",
        legal_code: "727P",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727Q",
        description: "OPPOSITION TREATED AS WITHDRAWN (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727R",
        description: "NOTICE OF OPPOSITION RECEIVED"
    },
    {
        country_code: "GB",
        legal_code: "727S",
        description: "OPPOSITION FILED UNDER SECT. 27(5) - AMENDMENT OF SPECIFICATION AFTER GRANT"
    },
    {
        country_code: "GB",
        legal_code: "727T",
        description: "APPL. TREATED AS ABANDONED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "727U",
        description: "WITHDRAWAL OF APPLICATION FOR AMENDMENT OF SPECIFICATION NOW OPEN TO OPPOSTION (SECT. 27)"
    },
    {
        country_code: "GB",
        legal_code: "727Z",
        description: "APPEAL TO THE PATENTS COURT LODGED (SECT. 27/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7281",
        description: "APPLICATION FOR RESTORATION WITHDRAWN (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7282",
        description: "APPLICATION FOR RESTORATION REFUSED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728A",
        description: "ORDER MADE RESTORING THE PATENT (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728B",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728C",
        description: "APPLICATION MADE FOR RESTORATION (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728D",
        description: "APPLICATION DEEMED WITHDRAWN (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728E",
        description: "APPLICATION NOT ENTERTAINED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728G",
        description: "APPLICATION FOR RESTORATION WITHDRAWN UNDER RULE 100 (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728H",
        description: "APPLICATION OUT OF TIME DATED ... (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728I",
        description: "APPLICATION TO THE COURT OF APPEAL (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728J",
        description: "APPEAL TO THE PATENTS COURT ALLOWED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728K",
        description: "PATENT RESTORED BY COURT ORDER (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728L",
        description: "PROCEEDING UNDER SECTION 28 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "728M",
        description: "APPLICATION MADE TO THE COURT OF APPEAL ** APPEAL DISMISSED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728N",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728P",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728Q",
        description: "APPLICATION NOT ADMITTED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728R",
        description: "APPLICATION REFUSED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728S",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPLICATION NOT ENTERTAINED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728T",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL ALLOWED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728U",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728V",
        description: "APPLICATION FOR RESTORATION FILED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728W",
        description: "APPLICATION WITHDRAWN (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728X",
        description: "APPL. FOR ACCEPTANCE RESTORATION OUTSIDE PRESCRIBED PERIOD UNDER RULE 100 (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728Y",
        description: "APPLICATION FOR RESTORATION ALLOWED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "728Z",
        description: "APPEAL TO THE PATENTS COURT LODGED (SECT. 28/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729A",
        description: "OFFER ACCEPTED BY THE COMPTROLLER (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729B",
        description: "OFFER NOT ACCEPTED BY THE COMPTROLLER (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729C",
        description: "PROCEEDING UNDER SECTION 29 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "729D",
        description: "PROCEEDING UNDER SECTION 29(2) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "729E",
        description: "OFFER TO SURRENDER ABATED - NOT PROCEEDED WITH (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729F",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729G",
        description: "OFFER REFUSED BY THE COMPTROLLER (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729S",
        description: "OFFER TO SURRENDER (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729U",
        description: "OFFER TO SURRENDER ACCEPTED BY THE COMPTROLLER (SECT. 29/1977)"
    },
    {
        country_code: "GB",
        legal_code: "729X",
        description: "SURRENDER SECT. 29/1977) DELETED"
    },
    {
        country_code: "GB",
        legal_code: "730",
        description: "SUBSTITUTION OF APPLICANTS ALLOWED (SECT. 30/1977)"
    },
    {
        country_code: "GB",
        legal_code: "730A",
        description: "PROCEEDING UNDER SECTION 30 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "730B",
        description: "PATENT NOT PROCEEDED WITH"
    },
    {
        country_code: "GB",
        legal_code: "730Z",
        description: "CORRECTION TO NOTICE - SECT. 30 TRANSACTIONS IN PATENT APPLICATIONS"
    },
    {
        country_code: "GB",
        legal_code: "731A",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT REVOKED (SECT. 73(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732",
        description: "REGISTRATION OF TRANSACTIONS, INSTRUMENTS OR EVENTS IN THE REGISTER (SECT. 32/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732A",
        description: "ORDER MADE RESTORING THE PATENT (SECT. 32/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732B",
        description: "REQUEST FOR CORRECTION OF ERRORS IN THE REGISTER (SECT. 32/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732C",
        description: "REQUEST FOR CORRECTION OF A CLERICAL ERROR (SECT. 32/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732D",
        description: "REQUEST FOR CORRECTION OF AN ERROR IN THE REGISTER (SECT. 32(2)(D)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "732E",
        description: "AMENDMENTS TO THE REGISTER IN RESPECT OF CHANGES OF NAME OR CHANGES AFFECTING RIGHTS (SECT. 32/1977)"
    },
    {
        country_code: "GB",
        legal_code: "733A",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 33/1977)"
    },
    {
        country_code: "GB",
        legal_code: "734A",
        description: "APPLICATION FOR RECTIFICATION OF REGISTER - APPLICATION DISCONTINUED (SECTION 34)"
    },
    {
        country_code: "GB",
        legal_code: "737A",
        description: "PROCEEDING UNDER SECTION 37(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "737B",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 37(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "737C",
        description: "PROCEEDING UNDER SECTION 37 OF THE PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "737D",
        description: "APPEAL TO THE PATENTS COURT (SECT. 37/1977)"
    },
    {
        country_code: "GB",
        legal_code: "737E",
        description: "APPLICATION MADE UNDER SECT. 37(1)/1977 REFUSED"
    },
    {
        country_code: "GB",
        legal_code: "737F",
        description: "APPEAL TO THE PATENTS COURT (SECT. 37/1977) WITHDRAWN"
    },
    {
        country_code: "GB",
        legal_code: "737G",
        description: "APPL. MADE UNDER SECT. 37/1977 REFERENCE ALLOWED"
    },
    {
        country_code: "GB",
        legal_code: "737H",
        description: "REFERENCE FILED UNDER SECTION 37(1)"
    },
    {
        country_code: "GB",
        legal_code: "737J",
        description: "REFERENCE UNDER SECTION 37(1)/1977 WITHDRAWN"
    },
    {
        country_code: "GB",
        legal_code: "737K",
        description: "REFERENCE UNDER SECT. 37(1) REFUSED - REF. AFTER GRANT CONCERNING UK ENTITLEMENT"
    },
    {
        country_code: "GB",
        legal_code: "737M",
        description: "REFERENCE TREATED AS WITHDRAWN - SECTION 37(1)"
    },
    {
        country_code: "GB",
        legal_code: "737N",
        description: "APPEAL TO THE PATENTS COURT DISMISSED-REFERENCE UNDER SECTION 37(1)"
    },
    {
        country_code: "GB",
        legal_code: "737O",
        description: "REFERENCE UNDER SECT. 37(1) DECIDED"
    },
    {
        country_code: "GB",
        legal_code: "740A",
        description: "PROCEEDING UNDER SECTION 40 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "740B",
        description: "APPLICATION DECIDED BY THE COMPTROLLER (SECT. 40/1977)"
    },
    {
        country_code: "GB",
        legal_code: "740C",
        description: "APPLICATION TO THE COURT OF APPEAL (SECT. 40/1977)"
    },
    {
        country_code: "GB",
        legal_code: "740F",
        description: "APPLICATION FILED BY EMPLOYEE FOR COMPENSATION - ACCORDING TO SECT. 40"
    },
    {
        country_code: "GB",
        legal_code: "740R",
        description: "APPLICATION BY EMPLOYEE FOR COMPENSATION - APPLICATION REFUSED SECTION 40"
    },
    {
        country_code: "GB",
        legal_code: "746",
        description: "REGISTER NOTED 'LICENCES OF RIGHT' (SECT. 46/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746A",
        description: "APPEAL TO THE PATENTS COURT (SECT. 46/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746B",
        description: "PROCEEDING UNDER SECTION 46(3) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "746C",
        description: "PATENT OF ADDITION (SECT. 46(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746D",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 46(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746E",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 46(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746F",
        description: "APPEAL TO THE PATENTS COURT (SECT. 46(3)/1977) ALLOWED"
    },
    {
        country_code: "GB",
        legal_code: "746S",
        description: "APPEAL TO THE COURT OF APPEAL LODGED (SECT. 46(3)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "746W",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 46(3)/1977) WITHDRAWN"
    },
    {
        country_code: "GB",
        legal_code: "747",
        description: "APPLICATION FOR CANCELLATION OF 'LICENCES OF RIGHT' IN THE REGISTER (SECT. 47/1977)"
    },
    {
        country_code: "GB",
        legal_code: "747A",
        description: "PROCEEDING UNDER SECTION 47 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "747B",
        description: "PROCEEDING UNDER SECT. 47(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "747C",
        description: "NOTICE THAT THE ENTRY IN THE REGISTER 'LICENCE OF RIGHT' WAS CANCELLED (SECT. 47/1977)"
    },
    {
        country_code: "GB",
        legal_code: "747D",
        description: "APPLIC. UNDER SECT. 47(1) BY A PROPRIETOR TO CANCEL AN ENTRY"
    },
    {
        country_code: "GB",
        legal_code: "747E",
        description: "LICENCE OF RIGHT ENTRY DISPOSAL"
    },
    {
        country_code: "GB",
        legal_code: "748",
        description: "APPLICATION WITHDRAWN (SECT. 48/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748A",
        description: "APPLICATION FOR AN ORDER FOR A LICENCE (SECT. 48/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748B",
        description: "APPLICATION REFUSED (SECT. 48(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748C",
        description: "PROCEEDING UNDER SECTION 48 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "748D",
        description: "PROCEEDING UNDER SECTION 48(3)(A) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "748E",
        description: "APPLICATION REFUSED (SECT. 48(1) AND 49(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748F",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 48/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748G",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 48(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748R",
        description: "ORDER MADE FOR A LICENCE (SECT. 48(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "748S",
        description: "APPLICATION WITHDRAWN (SECT. 48(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "750A",
        description: "CERTIFICATE OF CONTESTED VALIDITY (RULE 50/1977)"
    },
    {
        country_code: "GB",
        legal_code: "752",
        description: "PROCEEDING UNDER SECTION 52(1) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "765A",
        description: "PROCEEDING UNDER SECTION 65 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "765B",
        description: "CERTIFICATE OF CONTESTED VALIDITY (SECT. 65(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771",
        description: "APPLICATION MADE FOR DECLARATION OF NON-INFRINGEMENT (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771A",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION NOT CONTESTED (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771B",
        description: "APPLICATION GRANTED IN PART (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771C",
        description: "DECLARATION NOT MADE (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771D",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION WITHDRAWN (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771E",
        description: "DECLARATION OF NON-INFRINGEMENT MADE (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771F",
        description: "APPLICATION WITHDRAWN (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771G",
        description: "APPLICATION FOR DECLARATION OF NON-INFRINGEMENT GRANTED IN PART DATED ... (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771H",
        description: "CASE DECIDED BY THE COMPTROLLER ** PROC. TERMINATED ... (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771I",
        description: "APPLICATION FOR DECLARATION OF NON-INFRINGEMENT (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771J",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771K",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION ALLOWED (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771L",
        description: "APPL. TREATED AS WITHDRAWN (SECT. 71/1977)"
    },
    {
        country_code: "GB",
        legal_code: "771M",
        description: "SECTION 71/1977"
    },
    {
        country_code: "GB",
        legal_code: "772",
        description: "APPLICATION MADE FOR REVOCATION (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7721",
        description: "APPLICATION MADE TO THE COMPTROLLER (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7722",
        description: "PETITION LODGED IN COURT (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7723",
        description: "CASE DEC. BY THE COMPTR. ** APPL. REFUSED ** NO ORDER FOR REVOCATION MADE (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7724",
        description: "CASE DEC. BY THE COMPTR. ** APPL. TREATED AS ABANDONED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7725",
        description: "APPLICATION FOR REVOCATION - PETITION(S) FOR REVOCATION LODGED IN THE COURT - SECTION 72"
    },
    {
        country_code: "GB",
        legal_code: "7726",
        description: "COUNTERCLAIM FOR REVOCATION TERMINATED"
    },
    {
        country_code: "GB",
        legal_code: "7727",
        description: "APPLICATION FOR REVOCATION: COURT ORDER (PATEND REVOKED) STAYED PENDING APPEAL TO THE COURT OF APPEAL (SECT. 72)"
    },
    {
        country_code: "GB",
        legal_code: "7728",
        description: "APPLICATION FOR REVOCATION: COURT ORDER DISCHARGES THE ORDER FOR REVOCATION (SECT. 72)"
    },
    {
        country_code: "GB",
        legal_code: "7729",
        description: "APPLICATION FOR REVOCATION BEFORE THE COMPTROLER; WITHDRAWAL OF APPEAL BEFORE THE CORT: AMMENDMENT ALLOWED (SECT. 72 AND 75)"
    },
    {
        country_code: "GB",
        legal_code: "772A",
        description: "APPLICATION MADE FOR RESTORATION (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772B",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT REVOKED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772C",
        description: "APPLICATION MADE TO THE COMPTROLLER FOR REVOCATION (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772D",
        description: "PROCEEDING TERMINATED BY VOLUNTARY SURRENDER OF PATENT (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772E",
        description: "APPLICATION WITHDRAWN (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772F",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772G",
        description: "APPLICATION TO COMPTROLLER FOR REVOCATION OF PATENT AND AMENDMENT OF SPECIFICATION THEREOF (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772H",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772I",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772J",
        description: "APPLICATION WITHDRAWN (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772K",
        description: "APPLICATION DEEMED NOT TO HAVE BEEN PROPERLY LAUNCHED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772L",
        description: "APPLICATION NOT PROCEEDED WITH (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772M",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772N",
        description: "PROCEEDING UNDER SECTION 72 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "772O",
        description: "AMENDED SPECIFICATION PRINTED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772P",
        description: "SPECIFICATION AMENDED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772Q",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 72 + 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772R",
        description: "PATENT REVOKED (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772S",
        description: "APPLICATION WITHDRAWN ** NO ORDER FOR REVOCATION MADE (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772T",
        description: "DECISION BY THE COMPTROLLER (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772U",
        description: "CASE DECIDED BY THE COMPTROLLER ** PRELIMINARY DECISION (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772V",
        description: "CASE DECIDED BY THE COMPTROLLER ** SUPPLEMENTARY DECISION (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772W",
        description: "APPLICATION MADE TO THE COMPTROLLER FOR REVOCATION (SECT. 72(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772X",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION WITHDRAWN ** NO ORDER FOR REVOCATION MADE (SECT. 72/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772Y",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 72+75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "772Z",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED ** NO ORDER FOR REVOCATION MADE (SECT. 72+75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7731",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 73(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7732",
        description: "CASE DECIDED BY THE COMPTROLLER ** PATENT REVOKED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773A",
        description: "PROCEEDING UNDER SECTION 73(2) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "773B",
        description: "CASE DECIDED BY THE COMPTROLLER ** SPECIFICATION AMENDED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773C",
        description: "ACTION NOT PROCEEDED WITH (SECT. 73/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773D",
        description: "PROC. TERMINATED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773E",
        description: "ACTION NOT PURSUED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773F",
        description: "ACTION TERMINATED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773G",
        description: "SPECIFICATION AMENDED ** NO ORDER FOR REVOCATION MADE (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773H",
        description: "REVOCATION ACTION IS NOT PURSUED (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773I",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773J",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 73(2)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "773K",
        description: "PATENT REVOKED UNDER SECT. 73(2)/1977"
    },
    {
        country_code: "GB",
        legal_code: "773L",
        description: "PATENT REVOKED UNDER SECT. 73(1)/1977"
    },
    {
        country_code: "GB",
        legal_code: "773M",
        description: "SECTION 73; REVOCATION ON THE COMPTROLLER'S INITIATIVE"
    },
    {
        country_code: "GB",
        legal_code: "774",
        description: "APPLICATION FOR DECLARATION OF NON-INFRINGEMENT IS WITHDRAWN (SECT. 74/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775A",
        description: "PROCEEDING UNDER SECTION 75 PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "775B",
        description: "SPECIFICATION AMENDED (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775C",
        description: "APPLICATION FOR AMENDMENT OF SPECIFICATION WITHDRAWN (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775D",
        description: "PROCEEDING UNDER SECTION 75 PATENTS ACT 1977 ** APPLICATION DISCONTINUED BY ORDER DATED ..."
    },
    {
        country_code: "GB",
        legal_code: "775E",
        description: "PATENT REVOKED (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775F",
        description: "COURT HAS BY ORDER DATED ... ALLOWED AMENDMENT OF SPECIFICATION (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775G",
        description: "APPLICATION WITHDRAWN (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775H",
        description: "APPEAL TO THE COURT OF APPEAL (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775J",
        description: "APPL. DISMISSED BY CONSENT ORDER (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775K",
        description: "APPL. NOT PROCEEDED WITH (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775L",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS. APPLICATION TO AMEND NOT PROCEEDED WITH (SECT. 75/1977)"
    },
    {
        country_code: "GB",
        legal_code: "775M",
        description: "PROCEEDINGS UNDER SECT. 75/1977 APPEAL DISMISSED"
    },
    {
        country_code: "GB",
        legal_code: "775O",
        description: "APPLICATION FOR AMENDMENT (SECT. 75/1977) OPEN TO OPPOSITION"
    },
    {
        country_code: "GB",
        legal_code: "775P",
        description: "GRANTED AMENDMENT NOW OPEN TO OPPOSITION - SECTION 75"
    },
    {
        country_code: "GB",
        legal_code: "775Q",
        description: "PATENT REVOKED BY COURT ORDER - STAYED PENDING APPEAL (SECT. 75)"
    },
    {
        country_code: "GB",
        legal_code: "775R",
        description: "APPEAL DETERMINED (SECT. 75)"
    },
    {
        country_code: "GB",
        legal_code: "775S",
        description: "APPLICTION DETERMINED (SECT. 75)"
    },
    {
        country_code: "GB",
        legal_code: "775T",
        description: "PROCEEDINGS UNDER SECT. 75/1977 PETITION FOR LEAVE TO APPEAL"
    },
    {
        country_code: "GB",
        legal_code: "775U",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS BEFORE THE HIGH COURT"
    },
    {
        country_code: "GB",
        legal_code: "775V",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS BEFORE THE COURT OF APPEAL"
    },
    {
        country_code: "GB",
        legal_code: "776",
        description: "APPLICATION MADE TO THE PATENTS COURT (SECT. 76/1977)"
    },
    {
        country_code: "GB",
        legal_code: "776A",
        description: "APPLICATION MADE FOR CORRECTION OF ERROR (SECT. 76/1977)"
    },
    {
        country_code: "GB",
        legal_code: "777A",
        description: "PROCEEDING UNDER SECTION 77(6) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "777B",
        description: "PROCEEDING UNDER SECTION 77(6)(A) PATENTS ACT 1977"
    },
    {
        country_code: "GB",
        legal_code: "781",
        description: "APPLICATION MADE TO THE PATENTS COURT ** APPEAL DISMISSED (SECT. 8(1)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7812",
        description: "APPEAL TO THE PATENTS COURT DISMISSED (SECT. 8 AND 12/1977)"
    },
    {
        country_code: "GB",
        legal_code: "789A",
        description: "REQUEST FOR PUBLICATION OF TRANSLATION (SECT. 89(A)/1977)"
    },
    {
        country_code: "GB",
        legal_code: "789B",
        description: "INTERNATIONAL APPLICATION WITHDRAWN (SECT. 89(3))"
    },
    {
        country_code: "GB",
        legal_code: "7A",
        description: "PATENT REVOKED (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "7B",
        description: "PATENT EXPIRED AFTER PROLONGATION OF 20 YEARS"
    },
    {
        country_code: "GB",
        legal_code: "817A",
        description: "APPLICATION FOR CORRECTION OF CLERICAL ERRORS NOW OPEN TO OPPOSITION (SECT. 117/1977)"
    },
    {
        country_code: "GB",
        legal_code: "891",
        description: "REINSTATEMENT OF APPLICATION (RULE 91(3)/1978)"
    },
    {
        country_code: "GB",
        legal_code: "891A",
        description: "APPLICATION FOR CORRECTION OF AN ERROR OF TRANSLATION OR TRANSCRIPTION, CLERICAL ERROR OR MISTAKE (RULE 91(3)/1978)"
    },
    {
        country_code: "GB",
        legal_code: "9110",
        description: "PERIOD PRESCRIBED HAS BEEN EXTENDED UNDER RULE 110(6)/1990"
    },
    {
        country_code: "GB",
        legal_code: "911A",
        description: "PROCEEDING UNDER RULE 110(4) OF THE PATENT RULES 1990"
    },
    {
        country_code: "GB",
        legal_code: "911B",
        description: "PROCEEDING UNDER RULE 110 OF THE PATENT RULES 1990"
    },
    {
        country_code: "GB",
        legal_code: "911C",
        description: "PROCEEDING UNDER RULE 110(1) OF THE PATENT RULES 1990"
    },
    {
        country_code: "GB",
        legal_code: "9141",
        description: "CASE DECIDED BY THE COMPTROLLER ** OPPONENT'S APPEAL DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "9142",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICANTS APPEAL ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "9143",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914A",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REFUSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914B",
        description: "CASE DECIDED ON APPEAL ** SPECIFICATION REMITTED FOR FURTHER AMENDMENT (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914C",
        description: "APPLICATION RELINQUISHED ** GRANT ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914D",
        description: "APPLICATION RELINQUISHED ** SPECIFICATION AMENDED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914E",
        description: "APPLICATION FOR PATENT RELINQUISHED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914F",
        description: "SPECIFICATION AMENDED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914G",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION FOR PATENT RELINQUISHED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914H",
        description: "CASE DECIDED ON APPEAL (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914I",
        description: "CASE DECIDED BY THE COMPTROLLER ** PRIORITY DATE NOT ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914J",
        description: "CASE DECIDED BY THE COMPTROLLER ** OPPOSITION NOT ENTERTAINED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914K",
        description: "NO PATENT SEALED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914L",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION RELINQUISHED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914M",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914N",
        description: "OPPOSITION CANCELLED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914O",
        description: "CASE DECIDED ON APPEAL ** GRANT ALLOWED SUBJECT TO AMENDMENT OF SPECIFICATION (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914P",
        description: "APPEAL WITHDRAWN (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914Q",
        description: "GRANT ALLOWED WITH AMENDMENT OF SPECIFICATION (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914R",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ** ALLOWED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914S",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ** DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914T",
        description: "OPPOSITION ENTERED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914U",
        description: "CASE DECIDED BY THE COMPTROLLER ** GRANT ALLOWED WITH AMENDMENT OF SPECIFICATION (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914V",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ENTERED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914W",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL WITHDRAWN (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914X",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL DISMISSED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "914Z",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL ENTERED (SECT. 14/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929",
        description: "APPLICATION TO THE COURT OF APPEAL (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929A",
        description: "CASE DECIDED ON APPEAL ** APPLICATION TO AMEND THE SPECIFICATION ALLOWED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929B",
        description: "APPLICATION RELINQUISHED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929C",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION FOR AMENDMENT OF SPECIFICATION REFUSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929D",
        description: "APPLICATION TO THE COURT OF APPEAL DISMISSED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "929E",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL ENTERED (SECT. 29/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933",
        description: "CASE DECIDED ON APPEAL ** PATENT REMITTED FOR AMENDMENT (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933A",
        description: "APPLICATION MADE FOR REVOCATION ** PATENT AMENDED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933B",
        description: "APPLICATION MADE FOR REVOCATION ** APPLICATION REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933C",
        description: "APPLICATION REFUSED ** NOT PROPERLY LAUNCHED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933D",
        description: "APPLICATION REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933E",
        description: "PROCEEDING UNDER SECTION 33 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "933F",
        description: "CASE DECIDED ON APPEAL ** NO ORDER MADE FOR REVOCATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933G",
        description: "CASE DECIDED BY THE COMPTROLLER (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933H",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ** WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933I",
        description: "APPLICATION TO APPEAL REFUSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933J",
        description: "APPLICATION FOR REVOCATION WITHDRAWN (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933K",
        description: "CASE DECIDED BY THE COMPTROLLER ** PROCEEDING TERMINATED BY SURRENDER OF PATENT UNDER SECTION 34"
    },
    {
        country_code: "GB",
        legal_code: "933L",
        description: "PROCEEDING TERMINATED BY SURRENDER OF THE PATENT UNDER SECTION 33 PATENTS ACT 1949"
    },
    {
        country_code: "GB",
        legal_code: "933N",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPLICATION REVOKED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933O",
        description: "APPLICATION TO COMPTROLLER FOR REVOCATION OF PATENT AND AMENDMENT OF SPECIFICATION THEREOF (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933P",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ** ENTERED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933Q",
        description: "CASE DECIDED BY THE COMPTROLLER ** ORDER MADE REQUIRING AMENDMENT OF SPECIFICATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933R",
        description: "CASE DECIDED BY THE COMPTROLLER ** ORDER MADE REFUSING THE APPLICATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933S",
        description: "CASE DECIDED BY THE COMPTROLLER ** ORDER MADE REVOKING THE UNDERMENTIONED PATENT (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933T",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL ALLOWED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933U",
        description: "CASE DECIDED BY THE COMPTROLLER ** APPEAL TO PATENTS APPEAL TRIBUNAL DISMISSED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933V",
        description: "APPEAL TO PATENTS APPEAL TRIBUNAL ** APPEAL ALLOWED (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933W",
        description: "APPLICATION WITHDRAWN ** NO ORDER FOR REVOCATION MADE (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933X",
        description: "CASE DECIDED BY THE COMPTROLLER ** PRELIMINARY DECISION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933Y",
        description: "APPLICATION MADE TO THE COMPTROLLER FOR REVOCATION (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "933Z",
        description: "APPEAL TO COURT OF APPEAL (SECT. 33/1949)"
    },
    {
        country_code: "GB",
        legal_code: "934D",
        description: "APPEAL TO THE COURT OF APPEAL DISMISSED (SECTION 34)"
    },
    {
        country_code: "GB",
        legal_code: "AAF",
        description: "AMENDED APPLICATION FILED"
    },
    {
        country_code: "GB",
        legal_code: "APTC",
        description: "APPEALS TO THE COURT"
    },
    {
        country_code: "GB",
        legal_code: "AT",
        description: "APPLICATIONS TERMINATED BEFORE PUBLICATION UNDER SECTION 16(1)"
    },
    {
        country_code: "GB",
        legal_code: "CAT",
        description: "CORRECTION TO FORMER ANNOUNCED TERMINATED APPLICATION (BEFORE GRANT)"
    },
    {
        country_code: "GB",
        legal_code: "COOA",
        description: "CHANGE IN APPLICANT'S NAME OR OWNERSHIP OF THE APPLICATION"
    },
    {
        country_code: "GB",
        legal_code: "CORR",
        description: "CORRECTION"
    },
    {
        country_code: "GB",
        legal_code: "CSNS",
        description: "APPLICATION OF WHICH COMPLETE SPECIFICATION HAVE BEEN ACCEPTED AND PUBLISHED, BUT PATENT IS NOT SEALED"
    },
    {
        country_code: "GB",
        legal_code: "CTFA",
        description: "APPLICATION FOR CERTIFICATE GRANTED"
    },
    {
        country_code: "GB",
        legal_code: "CTFC",
        description: "CERTIFICATE: APPEAL TO THE PATENTS COURT"
    },
    {
        country_code: "GB",
        legal_code: "CTFE",
        description: "CERTIFICATE ENTERED INTO FORCE"
    },
    {
        country_code: "GB",
        legal_code: "CTFF",
        description: "CERTIFICATE FILED"
    },
    {
        country_code: "GB",
        legal_code: "CTFG",
        description: "CERTIFICATE GRANTED"
    },
    {
        country_code: "GB",
        legal_code: "CTFI",
        description: "CERTIFICATE DECLARED INVALID"
    },
    {
        country_code: "GB",
        legal_code: "CTFL",
        description: "CERTIFICATE LAPSED"
    },
    {
        country_code: "GB",
        legal_code: "CTFR",
        description: "APPLICATION FOR CERTIFICATE REJECTED"
    },
    {
        country_code: "GB",
        legal_code: "CTFV",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE REVOKED"
    },
    {
        country_code: "GB",
        legal_code: "CTFW",
        description: "APPLICATION TO WITHDRAW OR OFFER TO SURRENDER A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "GB",
        legal_code: "EER",
        description: "ERRONEOUS ENTRY IN THE REGISTER OF PATENTS:"
    },
    {
        country_code: "GB",
        legal_code: "EPF",
        description: "PATENT EXTENDED IN PURSUANCE OF APPLICATION FOR EXTENSION OF TERM AND IN FORCE"
    },
    {
        country_code: "GB",
        legal_code: "EPO",
        description: "PATENT FOR WHICH APPLICATION FOR EXTENSION OF TERM HAS BEEN MADE TO THE COMPTROLLER OR THE COURT"
    },
    {
        country_code: "GB",
        legal_code: "EPR",
        description: "APPLICATION TO COMPTROLLER FOR EXTENSION OF TERM REFUSED, DECISION OPEN TO APPEAL"
    },
    {
        country_code: "GB",
        legal_code: "ERR",
        description: "ERRATUM"
    },
    {
        country_code: "GB",
        legal_code: "FG4C",
        description: "CORRECTIONS FOR GRANTED EUROPEAN PATENS"
    },
    {
        country_code: "GB",
        legal_code: "FG4D",
        description: "EUROPEAN PATENT GRANTED"
    },
    {
        country_code: "GB",
        legal_code: "FG4L",
        description: "PUBLICATION LANGUAGE OF GRANTED EUROPEAN PATENT (CORRECTION)"
    },
    {
        country_code: "GB",
        legal_code: "FG4W",
        description: "PATENT WAS ACTUALLY WITHDRAWN AT THE EPO"
    },
    {
        country_code: "GB",
        legal_code: "IF02",
        description: "EUROPEAN PATENT IN FORCE AS OF 2002-01-01"
    },
    {
        country_code: "GB",
        legal_code: "MK4A",
        description: "EXPIRATION OF TERM (SECT. 11 PAT.ACT. 1987)"
    },
    {
        country_code: "GB",
        legal_code: "PCNP",
        description: "PATENT CEASED THROUGH NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "GB",
        legal_code: "PCOR",
        description: "CORRECTION OF FILING AN APPLICATION OR GRANTING A PATENT"
    },
    {
        country_code: "GB",
        legal_code: "PCPE",
        description: "DELETE 'PATENT CEASED' FROM JOURNAL"
    },
    {
        country_code: "GB",
        legal_code: "PE",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "GB",
        legal_code: "PE16",
        description: "PATENT EXPIRED AFTER TERMINATION OF 16 YEARS"
    },
    {
        country_code: "GB",
        legal_code: "PE20",
        description: "PATENT EXPIRED AFTER TERMINATION OF 20 YEARS"
    },
    {
        country_code: "GB",
        legal_code: "PEX",
        description: "PATENT EXTENDED IN PURSUANCE OF APPLICATION FOR EXTENSION OF TERM AND IN FORCE"
    },
    {
        country_code: "GB",
        legal_code: "PG",
        description: "PATENT GRANTED"
    },
    {
        country_code: "GB",
        legal_code: "PLE",
        description: "ENTRIES RELATING ASSIGNMENTS, TRANSMISSIONS, LICENCES IN THE REGISTER OF PATENTS"
    },
    {
        country_code: "GB",
        legal_code: "PLNP",
        description: "PATENT LAPSED THROUGH NONPAYMENT OF RENEWAL FEES"
    },
    {
        country_code: "GB",
        legal_code: "PR",
        description: "PATENT REVOKED"
    },
    {
        country_code: "GB",
        legal_code: "PS",
        description: "PATENT SEALED"
    },
    {
        country_code: "GB",
        legal_code: "Q107",
        description: "CORRECTION OF IRREGULARITIES (ACCORDING PAT. RULES 2007)"
    },
    {
        country_code: "GB",
        legal_code: "R107",
        description: "COMPTROLLERS DISCRETION ACCORDING RULE 107"
    },
    {
        country_code: "GB",
        legal_code: "R108",
        description: "ALTERATION OF TIME LIMITS (PATENTS RULES 1995)"
    },
    {
        country_code: "GB",
        legal_code: "RCOR",
        description: "CORRECTION TO FORMER NOTICE OF VOID, REVOKED, CEASED OR EXPIRED PATENT"
    },
    {
        country_code: "GB",
        legal_code: "REG",
        description: "REFERENCE TO A NATIONAL CODE"
    },
    {
        country_code: "GB",
        legal_code: "RH",
        description: "REINSTATED AFTER PUBLICATION UNDER RULE 100(2)"
    },
    {
        country_code: "GB",
        legal_code: "RIAT",
        description: "APPLICATION REINSTATED AFTER ADVERTIZING THE TERMINATION BEFORE PUBLICATION UNDER 16(1)"
    },
    {
        country_code: "GB",
        legal_code: "RJ",
        description: "REINSTATED UNDER RULE 110(4) OR 100(2) - ALTERATION OF TIME LIMITS"
    },
    {
        country_code: "GB",
        legal_code: "RL",
        description: "REQUEST TO EXTEND THE LIMITS UNDER RULE 110(4)"
    },
    {
        country_code: "GB",
        legal_code: "S10",
        description: "REQUEST BY JOINT APPLICANTS FOR DIRECTIONS (SECT. 10/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S117",
        description: "CORRECTION OF ERRORS IN PATENTS AND APPLICATIONS (SECT. 117/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S11E",
        description: "DETERMINATION BEFORE GRANT OF UK ENTITLEMENT CONCERNING A LICENCE (SECTION 11(5) PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S12A",
        description: "DETERMINATION OF FOREIGN ENTITLEMENT (SECT. 12(1)/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S12D",
        description: "DETERMINATION OF FOREIGN ENTITLEMENT, REQUEST BY JOINT APPLICANTS (SECT. 12(4) PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S13A",
        description: "APPLICATION FOR INVENTOR TO BE MENTIONED (SECTION 13(1)/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S13C",
        description: "APPLICATION FOR INVENTOR NOT TO BE MENTIONED (SECTION 13(3) PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S1Z",
        description: "APPEAL TO THE COURT OF APPEAL (NOVELTY OF THE PATENT)"
    },
    {
        country_code: "GB",
        legal_code: "S20A",
        description: "REINSTATEMENT OF APPLICATION (SECT. 20A/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S27",
        description: "AMENDMENT OF SPECIFICATION AFTER GRANT (SECT. 27/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S28",
        description: "RESTORATION OF CEASED PATENTS (SECT. 28/PAT. ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S29",
        description: "SURRENDER OF PATENT (SECT. 29/PAT. ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S30Z",
        description: "ASSIGNMENTS FOR LICENCE OR SECURITY REASONS"
    },
    {
        country_code: "GB",
        legal_code: "S37A",
        description: "REFERENCE AFTER GRANT CONCERNING UK ENTITLEMENT (SECT. 37(1)/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S40",
        description: "APPLICATION BY EMPLOYEE FOR COMPENSATION (SECT. 40/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S47",
        description: "CANCELLATION ON ENTRY ON THE REGISTER OF A LICENCE OF RIGHT (SECT 47/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S48",
        description: "APPLICATION CONCERNING COMPULSORY LICENCES"
    },
    {
        country_code: "GB",
        legal_code: "S71",
        description: "APPLICATION FOR DECLARATION OF NON-INFRINGEMENT (SECT. 71/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S72",
        description: "APPLICATION FOR REVOCATION BEFORE THE COMPTROLLER (SECT. 72/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S72Y",
        description: "APPLICATION FOR REVOCATION BEFORE THE COMPTROLLER (SECT. 72) REFUSED"
    },
    {
        country_code: "GB",
        legal_code: "S72Z",
        description: "CLAIM OR COUNTERCLAIM FOR REVOCATION BEFORE THE COURT (SECT. 72 PATENTS ACT1977)"
    },
    {
        country_code: "GB",
        legal_code: "S73",
        description: "REVOCATION ON COMPTROLLER'S INITIATIVE (SECTION 73/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S75",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS BEFORE THE COMPTROLLER (SECT. 75/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S75Z",
        description: "AMENDMENT OF PATENT IN INFRINGEMENT OR REVOCATION PROCEEDINGS BEFORE THE COURT (SECT. 75/PATENTS ACT 1977)"
    },
    {
        country_code: "GB",
        legal_code: "S8A",
        description: "DETERMINATION BEFORE GRANT OF UK ENTITLEMENT (SECTION 8(1)/PATENTS ACT 1077)"
    },
    {
        country_code: "GB",
        legal_code: "SP",
        description: "AMENDMENT (SLIPS) PRINTED"
    },
    {
        country_code: "GB",
        legal_code: "SPA",
        description: "AMENDED SPECIFICATION PUBLISHED"
    },
    {
        country_code: "GB",
        legal_code: "SPAC",
        description: "AMENDED SPECIFICATION PUBLISHED ** COPY OF THE SPECIFICATION NOW AVAILABLE"
    },
    {
        country_code: "GB",
        legal_code: "SPCE",
        description: "SPC EXPIRED"
    },
    {
        country_code: "GB",
        legal_code: "SPCI",
        description: "SUPPLEMETARY PROTECTION CERTIFICATE INVALID"
    },
    {
        country_code: "GB",
        legal_code: "SPCX",
        description: "CORRECTION OF AN ERRATUM IN THE GAZETTE CONCERNING AN SPC"
    },
    {
        country_code: "GB",
        legal_code: "SPCY",
        description: "SPC EXTENSION LODGED"
    },
    {
        country_code: "GB",
        legal_code: "SPCZ",
        description: "SPC EXTENSION GRANTED"
    },
    {
        country_code: "GB",
        legal_code: "TH",
        description: "TRANSLATIONS FILED: AMENDED EUROPEAN PATENTS - CORRECTION"
    },
    {
        country_code: "GB",
        legal_code: "WAP",
        description: "APPLICATION WITHDRAWN, TAKEN TO BE WITHDRAWN OR REFUSED ** AFTER PUBLICATION UNDER SECTION 16(1)"
    },
    {
        country_code: "GB",
        legal_code: "WAPI",
        description: "PATENT APPLICATION ANNOUNCED AS TERMINATED (AFTER PUBLICATION) IN ERROR. APPLICATION HAS NOW BEEN REINSTATED (UNDER PROVISION OF RULE 107)"
    },
    {
        country_code: "GB",
        legal_code: "WAPP",
        description: "APPLICATION ALLOWED TO PROCEED"
    },
    {
        country_code: "GB",
        legal_code: "X",
        description: "NO DOCUMENT PUBLISHED"
    },
    {
        country_code: "GB",
        legal_code: "XX",
        description: "MISCELLANEOUS:"
    },
    {
        country_code: "GR",
        legal_code: "FG4A",
        description: "VALIDATION IN GREECE"
    },
    {
        country_code: "GR",
        legal_code: "MF4A",
        description: "RIGHT REVOKED FOLLOWING OPPOSITION OR REVOCATION"
    },
    {
        country_code: "GR",
        legal_code: "MH4A",
        description: "RENUNCIATION"
    },
    {
        country_code: "GR",
        legal_code: "MM2A",
        description: "ANNULMENT OR LAPSE DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "Hong",
        legal_code: "Kong",
        description: ""
    },
    {
        country_code: "HK",
        legal_code: "AD",
        description: "APPLICATION DEEMED WITHDRAWN"
    },
    {
        country_code: "HK",
        legal_code: "AF",
        description: "APPLICATION IN FORCE"
    },
    {
        country_code: "HK",
        legal_code: "AF1",
        description: "APPLICATION DEEMED WITHDRAWN UNDER S.33(2) (NOT PAYMENT OF MAINTENANCE FEE AND HAS 6-MONTH GRACE PERIOD TO PAY)"
    },
    {
        country_code: "HK",
        legal_code: "AM",
        description: "AMENDED SPECIFICATION (ACCORDING SECT 146 OF PATENT LAW)"
    },
    {
        country_code: "HK",
        legal_code: "AM43",
        description: "AMENDMENT OF STANDARD PATENT FOLLOWING OPPOSITION OR REVOCATION PROCEEDINGS IN THE DESIGNATED PATENT OFFICE (ACC. SECT 43 PATENT ORDINANCE)"
    },
    {
        country_code: "HK",
        legal_code: "AM46",
        description: "AMENDMENT OF PATENT SPECIFICATIONS AFTER GRANT UNDER SECTION 46 OF THE PATENTS ORDINANCE"
    },
    {
        country_code: "HK",
        legal_code: "AMPC",
        description: "AMENDED SPECIFICATION; PATENT CEASED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "AMPE",
        description: "AMENDED SPECIFICATION; PATENT EXPIRED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "AMPF",
        description: "AMENDED SPECIFICATION: PATENT STILL IN FORCE"
    },
    {
        country_code: "HK",
        legal_code: "AR",
        description: "APPLICATION REFUSED"
    },
    {
        country_code: "HK",
        legal_code: "ARF",
        description: "APPLICATION FILED FOR RESTORATION OF STANDARD PATENT"
    },
    {
        country_code: "HK",
        legal_code: "ARG",
        description: "RESTORATION OF STANDARD PATENT GRANTED"
    },
    {
        country_code: "HK",
        legal_code: "ARR",
        description: "APPLICATION REFUSED FOR RESTORATION OF STANDARD PATENT"
    },
    {
        country_code: "HK",
        legal_code: "AS",
        description: "CHANGE OF OWNERSHIP"
    },
    {
        country_code: "HK",
        legal_code: "ASPC",
        description: "CHANGE OF OWNERSHIP; PATENT CEASED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "ASPE",
        description: "CHANGE OF OWNERSHIP; PATENT EXPIRED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "ASPF",
        description: "CHANGE OF OWNERSHIP; PATENT STILL IN FORCE"
    },
    {
        country_code: "HK",
        legal_code: "AW",
        description: "APPLICATION WITHDRAWN"
    },
    {
        country_code: "HK",
        legal_code: "CHPA",
        description: "CHANGE OF A PARTICULAR IN THE REGISTER (EXCEPT OF CHANGE OF OWNERSHIP)"
    },
    {
        country_code: "HK",
        legal_code: "CHRG",
        description: "CHANGES IN THE REGISTER"
    },
    {
        country_code: "HK",
        legal_code: "CO",
        description: "CORRECTION OF SPECIFICATION"
    },
    {
        country_code: "HK",
        legal_code: "COPC",
        description: "CORRECTION OF SPECIFICATION; PATENT CEASED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "COPE",
        description: "CORRECTION OF SPECIFICATION; PATENT EXPIRED IN MEANTIME"
    },
    {
        country_code: "HK",
        legal_code: "COPF",
        description: "CORRECTION OF SPECIFICATION; PATENT STILL IN FORCE"
    },
    {
        country_code: "HK",
        legal_code: "CORR",
        description: "CORRIGENDUM"
    },
    {
        country_code: "HK",
        legal_code: "DE",
        description: "REQUESTS TO DESIGNATE PATENT IN HONG KONG"
    },
    {
        country_code: "HK",
        legal_code: "GR",
        description: "STANDARD PATENTS GRANTED IN HONG KONG"
    },
    {
        country_code: "HK",
        legal_code: "NR",
        description: "PATENT DEEMED NEVER TO HAVE BEEN ADDED TO THE REGISTER UNDER SECTION 13(7) OF PATENTS (TRANSITIONAL ARRANGEMENTS) RULES"
    },
    {
        country_code: "HK",
        legal_code: "PC",
        description: "PATENT CEASED (I.E. PATENT HAS LAPSED DUE TO THE FAILURE TO PAY THE RENEWAL FEE)"
    },
    {
        country_code: "HK",
        legal_code: "PE",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "HK",
        legal_code: "PEU",
        description: "SHORT-TERM PATENTS EXPIRED"
    },
    {
        country_code: "HK",
        legal_code: "PF",
        description: "PATENT IN FORCE"
    },
    {
        country_code: "HK",
        legal_code: "PF1",
        description: "PATENT CEASED TO HAVE EFFECT UNDER S.39(2) (NOT PAYMENT OF MAINTENANCE FEE AND HAS 6-MONTH GRACE PERIOD TO PAY)"
    },
    {
        country_code: "HK",
        legal_code: "PF2",
        description: "SHORT-TERM PATENT CEASED TO HAVE EFFECT UNDER S.126(2) (NOT PAYMENT OF MAINTENANCE FEE AND HAS 6-MONTH GRACE PERIOD TO PAY)"
    },
    {
        country_code: "HK",
        legal_code: "PR",
        description: "PATENT REVOKED"
    },
    {
        country_code: "HK",
        legal_code: "PS",
        description: "PATENT SURRENDERED"
    },
    {
        country_code: "HK",
        legal_code: "REV",
        description: "REVOCATION"
    },
    {
        country_code: "HK",
        legal_code: "S146",
        description: "CORRECTION OF ERRORS IN PATENTS AND APPLICATIONS UNDER SECTION 146 OF THE PATENTS ORDINANCE"
    },
    {
        country_code: "HK",
        legal_code: "WD",
        description: "APPLICATIONS WITHDRAWN, DEEMED TO BE WITHDRAWN, OR REFUSED AFTER PUBLICATION IN HONG KONG"
    },
    {
        country_code: "HU",
        legal_code: "AA1S",
        description: "INFORMATION ON APPLICATION FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "HU",
        legal_code: "AG4A",
        description: "FILING OF THE TRANSLATION OF THE TEXT OF EUROPEAN PATENTS"
    },
    {
        country_code: "HU",
        legal_code: "AG4B",
        description: "PUBLICATION OF THE TRANSLATION OF THE CLAIMS OF EUROPEAN PATENT APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "AG9A",
        description: "PUBLICATION OF THE TRANSLATION OF THE CLAIMS OF EUROPEAN PATENT APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "BBF9",
        description: "CANCELLATION OF EARLIER PUBLICATION ON APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "BEE1",
        description: "APPLICATION UNDER SUBSEQUENT EXAMINATION"
    },
    {
        country_code: "HU",
        legal_code: "BF9A",
        description: "CANCELLATION OF OFFICIAL INFORMATION"
    },
    {
        country_code: "HU",
        legal_code: "BFA1",
        description: "ABANDONMENT OR WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "BFA9",
        description: "TEMPORARY PROT. CANCELLED DUE TO ABANDONMENT"
    },
    {
        country_code: "HU",
        legal_code: "BFC4",
        description: "CANCELLATION OF TEMPORARY PROT. DUE TO REFUSAL"
    },
    {
        country_code: "HU",
        legal_code: "BFC9",
        description: "REFUSAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "BFD9",
        description: "TEMPORARY PROT. CANCELLED DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "BGB9",
        description: "SUCCESSION IN TITLE OF APPLICANT"
    },
    {
        country_code: "HU",
        legal_code: "BLC4",
        description: "LIMITATION OF CLAIMS"
    },
    {
        country_code: "HU",
        legal_code: "BMM4",
        description: "CANCELLATION OF FINAL PROT. DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "BNF4",
        description: "RESTORATION OF LAPSED FINAL PROT."
    },
    {
        country_code: "HU",
        legal_code: "BNF9",
        description: "RESTORATION OF LAPSED TEMPORARY PROT."
    },
    {
        country_code: "HU",
        legal_code: "BPC4",
        description: "SUCCESSION IN TITLE OF PATENTEE"
    },
    {
        country_code: "HU",
        legal_code: "BQB4",
        description: "LICENSE GRANTED & REGISTERED"
    },
    {
        country_code: "HU",
        legal_code: "BRH9",
        description: "WITHDRAWAL OF ANNULMENT DECISION"
    },
    {
        country_code: "HU",
        legal_code: "BSC4",
        description: "PRINTED PATENT SPECIFICATION AVAILABLE"
    },
    {
        country_code: "HU",
        legal_code: "BTK4",
        description: "INVALIDATION OF PUBLICATION ON B DOCUMENTS"
    },
    {
        country_code: "HU",
        legal_code: "DBF9",
        description: "CANCELLATION OF EARLIER PUBLICATION ON APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "DEE1",
        description: "APPLICATION UNDER SUBSEQUENT EXAMINATION"
    },
    {
        country_code: "HU",
        legal_code: "DFA1",
        description: "ABANDONMENT OR WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "DFA9",
        description: "TEMPORARY PROT. CANCELLED DUE TO ABANDONMENT"
    },
    {
        country_code: "HU",
        legal_code: "DFC4",
        description: "CANCELLATION OF TEMPORARY PROT. DUE TO REFUSAL"
    },
    {
        country_code: "HU",
        legal_code: "DFC9",
        description: "REFUSAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "DFD9",
        description: "TEMPORARY PROT. CANCELLED DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "DFG4",
        description: "PATENT GRANTED, DATE OF GRANTING"
    },
    {
        country_code: "HU",
        legal_code: "DGB9",
        description: "SUCCESSION IN TITLE OF APPLICANT"
    },
    {
        country_code: "HU",
        legal_code: "DLC4",
        description: "LIMITATION OF CLAIMS"
    },
    {
        country_code: "HU",
        legal_code: "DMA4",
        description: "CANCELLATION OF FINAL PROT. DUE TO ABANDONMENT"
    },
    {
        country_code: "HU",
        legal_code: "DMC4",
        description: "CANCELLATION OF FINAL PROT. DUE TO ANNULMENT"
    },
    {
        country_code: "HU",
        legal_code: "DMH4",
        description: "CANCELLATION OF FINAL PROT. DUE TO RELINGUISHMENT"
    },
    {
        country_code: "HU",
        legal_code: "DMK4",
        description: "ANNULMENT OF FINAL PROT. DUE TO EXPIRATION OF TERM"
    },
    {
        country_code: "HU",
        legal_code: "DMM4",
        description: "CANCELLATION OF FINAL PROT. DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "DNF4",
        description: "RESTORATION OF LAPSED FINAL PROT."
    },
    {
        country_code: "HU",
        legal_code: "DNF9",
        description: "RESTORATION OF LAPSED TEMPORARY PROT."
    },
    {
        country_code: "HU",
        legal_code: "DPC4",
        description: "SUCCESSION IN TITLE OF PATENTEE"
    },
    {
        country_code: "HU",
        legal_code: "DQB4",
        description: "LICENSE GRANTED & REGISTERED"
    },
    {
        country_code: "HU",
        legal_code: "DRH9",
        description: "WITHDRAWAL OF ANNULMENT DECISION"
    },
    {
        country_code: "HU",
        legal_code: "DTK4",
        description: "INVALIDATION OF PUBLICATION ON B DOCUMENTS"
    },
    {
        country_code: "HU",
        legal_code: "FA9A",
        description: "LAPSE OF PROVISIONAL PATENT PROTECTION DUE TO RELINQUISHMENT OR PROTECTION CONSIDERED RELINQUISHED"
    },
    {
        country_code: "HU",
        legal_code: "FC4A",
        description: "LAPSE OF PROVISIONAL APPLICATION DUE TO REFUSAL"
    },
    {
        country_code: "HU",
        legal_code: "FC9A",
        description: "PATENT GRANTING PROCEDURES TERMINATED PRIOR TO PUBLICATION"
    },
    {
        country_code: "HU",
        legal_code: "FD9A",
        description: "LAPSE OF PROVISIONAL PROTECTION DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "HU",
        legal_code: "FG4S",
        description: "GRANT OF SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "HU",
        legal_code: "FH1C",
        description: "APPOINTMENT OF REPRESENTATIVE"
    },
    {
        country_code: "HU",
        legal_code: "FH91",
        description: "APPOINTMENT OF A REPRESENTATIVE"
    },
    {
        country_code: "HU",
        legal_code: "FH92",
        description: "TERMINATION OF REPRESENTATIVE"
    },
    {
        country_code: "HU",
        legal_code: "GB9A",
        description: "SUCCESSION IN TITLE"
    },
    {
        country_code: "HU",
        legal_code: "GB9C",
        description: "SUCCESSION IN TITLE"
    },
    {
        country_code: "HU",
        legal_code: "HA9A",
        description: "CHANGE IN (THE SHARE OF) AUTHORSHIP"
    },
    {
        country_code: "HU",
        legal_code: "HBF9",
        description: "CANCELLATION OF EARLIER PUBLICATION ON APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "HC9A",
        description: "CHANGE OF NAME, ADDRESS"
    },
    {
        country_code: "HU",
        legal_code: "HC9C",
        description: "CHANGE OF NAME, ADDRESSE"
    },
    {
        country_code: "HU",
        legal_code: "HEE1",
        description: "APPLICATION UNDER SUBSEQUENT EXAMINATION"
    },
    {
        country_code: "HU",
        legal_code: "HFA1",
        description: "ABANDONMENT OR WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "HFA9",
        description: "TEMPORARY PROT. CANCELLED DUE TO ABANDONMENT"
    },
    {
        country_code: "HU",
        legal_code: "HFC4",
        description: "CANCELLATION OF TEMPORARY PROT. DUE TO REFUSAL"
    },
    {
        country_code: "HU",
        legal_code: "HFC9",
        description: "REFUSAL OF APPLICATION"
    },
    {
        country_code: "HU",
        legal_code: "HFD9",
        description: "TEMPORARY PROT. CANCELLED DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "HFG4",
        description: "PATENT GRANTED, DATE OF GRANTING"
    },
    {
        country_code: "HU",
        legal_code: "HGB9",
        description: "SUCCESSION IN TITLE OF APPLICANT"
    },
    {
        country_code: "HU",
        legal_code: "HLC4",
        description: "LIMITATION OF CLAIMS"
    },
    {
        country_code: "HU",
        legal_code: "HMA4",
        description: "CANCELLATION OF FINAL PROT. DUE TO ABANDONMENT"
    },
    {
        country_code: "HU",
        legal_code: "HMC4",
        description: "CANCELLATION OF FINAL PROT. DUE TO ANNULMENT"
    },
    {
        country_code: "HU",
        legal_code: "HMH4",
        description: "CANCELLATION OF FINAL PROT. DUE TO RELINGUISHMENT"
    },
    {
        country_code: "HU",
        legal_code: "HMK4",
        description: "ANNULMENT OF FINAL PROT. DUE TO EXPIRATION OF TERM"
    },
    {
        country_code: "HU",
        legal_code: "HMM4",
        description: "CANCELLATION OF FINAL PROT. DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "HU",
        legal_code: "HNF4",
        description: "RESTORATION OF LAPSED FINAL PROT."
    },
    {
        country_code: "HU",
        legal_code: "HNF9",
        description: "RESTORATION OF LAPSED TEMPORARY PROT."
    },
    {
        country_code: "HU",
        legal_code: "HPC4",
        description: "SUCCESSION IN TITLE OF PATENTEE"
    },
    {
        country_code: "HU",
        legal_code: "HQB4",
        description: "LICENSE GRANTED & REGISTERED"
    },
    {
        country_code: "HU",
        legal_code: "HRH9",
        description: "WITHDRAWAL OF ANNULMENT DECISION"
    },
    {
        country_code: "HU",
        legal_code: "HTK4",
        description: "INVALIDATION OF PUBLICATION ON B DOCUMENTS"
    },
    {
        country_code: "HU",
        legal_code: "HU90",
        description: "PATENT VALID ON 900628"
    },
    {
        country_code: "HU",
        legal_code: "MF4A",
        description: "LIMITATION OF PATENT"
    },
    {
        country_code: "HU",
        legal_code: "MH4A",
        description: "LAPSE OF DEFINITIVE PATENT PROTECTION DUE TO RELINQUISMENT"
    },
    {
        country_code: "HU",
        legal_code: "MM4A",
        description: "LAPSE OF DEFINITIVE PATENT PROTECTION DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "HU",
        legal_code: "NF4A",
        description: "RESTORATION OF PATENT PROTECTION"
    },
    {
        country_code: "HU",
        legal_code: "QB4A",
        description: "EXPLOITATION CONTRACT"
    },
    {
        country_code: "HU",
        legal_code: "RH9A",
        description: "WITHDRAWAL OF DECISION ON THE LAPSE OF PATENT PROTECTION"
    },
    {
        country_code: "HU",
        legal_code: "TH4A",
        description: "ERRATUM"
    },
    {
        country_code: "HU",
        legal_code: "TK4A",
        description: "CORRECTION OF CHANGE OF DECISION"
    },
    {
        country_code: "IE",
        legal_code: "AE9A",
        description: "APPLICATION ALLOWED TO PROCEED FOLLOWING HEARING"
    },
    {
        country_code: "IE",
        legal_code: "CA39",
        description: "APPLICATION FOR SURRENDER NOW OPEN TO OPPOSITION -SECTION 39"
    },
    {
        country_code: "IE",
        legal_code: "CDHP",
        description: "DECISION IN HEARING IN THE PATENTS OFFICE (PATENTS ACT 1964)"
    },
    {
        country_code: "IE",
        legal_code: "CH19",
        description: "PROCEEDINGS UNDER SECTION 19 OF THE PATENT ACT 1964 (NOTICE OF WITHDRAWAL OF OPPOSITION)"
    },
    {
        country_code: "IE",
        legal_code: "CH66",
        description: "PROCEEDINGS UNDER SECTION 66 (ACTIONS FOR INFRINGEMENT FOR SHORT TERM PATENTS)"
    },
    {
        country_code: "IE",
        legal_code: "CJ29",
        description: "PROCEEDINGS UNDER SECTION 29**APPLICATION NOW OPENED TO OPPOSITION"
    },
    {
        country_code: "IE",
        legal_code: "CJ37",
        description: "PROCEEDINGS UNDER SECTION 37**APPLICATION NOW OPEN TO OPPOSITION"
    },
    {
        country_code: "IE",
        legal_code: "CORR",
        description: "PROCEEDING UNDER SECTION 110 OF THE PATENTS ACT, 1992: CORRECTION OF ERRORS"
    },
    {
        country_code: "IE",
        legal_code: "DD9A",
        description: "APPLICATION FOR AMENDMENT OF PATENT SPECIFICATION NOW OPEN TO OPPOSITION (SECT. 38)"
    },
    {
        country_code: "IE",
        legal_code: "DE9A",
        description: "APPLICAITON FOR AMENDMENT OF PATENT SPECIFICATION (SECT. 38), PROCEDDINGS BEFORE HIGH COURT"
    },
    {
        country_code: "IE",
        legal_code: "ERR",
        description: "ERRATUM"
    },
    {
        country_code: "IE",
        legal_code: "F35A",
        description: "APPLICATION FOR REINSTATEMENT OF PATENT APPLICATION (ACC. SECTION 35A PAT. ACT 2006)"
    },
    {
        country_code: "IE",
        legal_code: "FA9A",
        description: "APPLICATION WITHDRAWN SECTION 33(1)"
    },
    {
        country_code: "IE",
        legal_code: "FA9B",
        description: "APPLICATIONS WITHDRAWN, DEEMED TO HAVE BEEN WITHDRAWN OR REFUSED**WITHDRAWN SECTION 33(3)"
    },
    {
        country_code: "IE",
        legal_code: "FC9A",
        description: "APPLICATION REFUSED SECT. 31(1)"
    },
    {
        country_code: "IE",
        legal_code: "FD4D",
        description: "EUROPEAN PATENTS DESIGNATING IRELAND TREATED AS ALWAYS HAVING BEEN VOID"
    },
    {
        country_code: "IE",
        legal_code: "FD4E",
        description: "SHORT TERM PATENTS DEEMED VOID UNDER SECTION 64"
    },
    {
        country_code: "IE",
        legal_code: "FD4H",
        description: "REINSTATEMENT OF EUROP. PATENT DESIGNATING IRELAND PREVIOUSLY ADVERTISED AS VOID - SECTION 119(7)"
    },
    {
        country_code: "IE",
        legal_code: "FG4D",
        description: "EUROPEAN PATENTS GRANTED DESIGNATING IRELAND"
    },
    {
        country_code: "IE",
        legal_code: "FG9R",
        description: "APPLICATION REINSTATED (PUBLISHED AS DEEMED TO HAVE BEEN WITHDRAWN BEFOREHAND UNDER SECTION 23(5))"
    },
    {
        country_code: "IE",
        legal_code: "FI9A",
        description: "APPLICATION DEEMED TO BE WITHDRAWN SECTION 17(2)"
    },
    {
        country_code: "IE",
        legal_code: "FJ9A",
        description: "APPLICATION DEEMED TO BE WITHDRAWN SECTION 31(3)"
    },
    {
        country_code: "IE",
        legal_code: "FK9A",
        description: "APPLICATION DEEMED TO HAVE BEEN WITHDRAWN SECTION 23(9)"
    },
    {
        country_code: "IE",
        legal_code: "HFAJ",
        description: "CHANGE OF FILING DATE"
    },
    {
        country_code: "IE",
        legal_code: "HH66",
        description: "INFRINGEMENT - EVIDENCE SUBMITTED UNDER SECTION 66(3)"
    },
    {
        country_code: "IE",
        legal_code: "HK1",
        description: "ERRATA: PATENT STILL IN FORCE"
    },
    {
        country_code: "IE",
        legal_code: "HK2",
        description: "ERRATA: PATENT LAPSED"
    },
    {
        country_code: "IE",
        legal_code: "HK3",
        description: "ERRATA: EP-PATENT STILL IN FORCE"
    },
    {
        country_code: "IE",
        legal_code: "HK4",
        description: "ERRATUM"
    },
    {
        country_code: "IE",
        legal_code: "HK5",
        description: "CANCELLATION OF ENTRY"
    },
    {
        country_code: "IE",
        legal_code: "LI68",
        description: "APPLICATION FOR ENTRY IN REGISTER THAT LICENCES OF RIGHT ARE AVAILABLE (SEC. 68 PATENTS ACT)"
    },
    {
        country_code: "IE",
        legal_code: "MA",
        description: "APPLICATION ABANDONED AFTER ADVERTISEMENT UNDER THE 1963 ACT"
    },
    {
        country_code: "IE",
        legal_code: "MA39",
        description: "PATENT SURRENDERED UNDER SECTION 39"
    },
    {
        country_code: "IE",
        legal_code: "ME9A",
        description: "APPLICATION FOR REVOCATION FILED (SECT. 57)"
    },
    {
        country_code: "IE",
        legal_code: "MK9A",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "IE",
        legal_code: "MM4A",
        description: "PATENT LAPSED"
    },
    {
        country_code: "IE",
        legal_code: "MM9A",
        description: "APPLICATION LAPSED THROUGH NON-PAYMENT OF RENEWAL FEE"
    },
    {
        country_code: "IE",
        legal_code: "ND27",
        description: "PROCEEDINGS UNDER SECTION 27 OF THE PATENT ACT 1964 (PETITION TO EXTEND THE TERM OF A PATENT)"
    },
    {
        country_code: "IE",
        legal_code: "NE29",
        description: "APPLICATIONS FOR RESTORATION OF LAPSED PATENTS UNDER SECTION 29 OF THE PATENT ACT 1964"
    },
    {
        country_code: "IE",
        legal_code: "NE4A",
        description: "APPLICATION FOR RESTORATION SECT. 37 PATENTS ACT 1992"
    },
    {
        country_code: "IE",
        legal_code: "NF4A",
        description: "ORDER MADE FOR RESTORATION SECT. 37 PATENTS ACT 1992"
    },
    {
        country_code: "IE",
        legal_code: "NJ37",
        description: "PROCEEDINGS UNDER SECTION 37**APPLICATION FOR RESTORATION REFUSED"
    },
    {
        country_code: "IE",
        legal_code: "NMA",
        description: "APPLICATION WITHDRAWN AFTER ADVERTISEMENT UNDER 1966 ACT"
    },
    {
        country_code: "IE",
        legal_code: "NW37",
        description: "APPLICATION FOR RESTORATION WITHDRAWN - SECTION 37 OF THE PATENTS ACT 1992"
    },
    {
        country_code: "IE",
        legal_code: "QD8A",
        description: "PROCEEDINGS UNDER SECTIONS 70 AND 73 OF THE PATENTS ACT 1992"
    },
    {
        country_code: "IE",
        legal_code: "QD9A",
        description: "APPLICATION FOR LICENCE WITHDRAWN (SECT. 70 & 73)"
    },
    {
        country_code: "IE",
        legal_code: "QU9A",
        description: "PROCEEDINGS UNDER SECTIONS 42 AND 44 OF THE PATENT ACT 1964 (APPLICATION FOR A LICENSE)"
    },
    {
        country_code: "IE",
        legal_code: "RNTA",
        description: "APPLICATION FOR RESTORATION WHERE TRANSLATION OF EP PATENT NOT FILED UNDER SECTION 119(6) (SECT. 30 OF PATENTS (AMENDMENT) ACT 2006 = SECT. 119A)"
    },
    {
        country_code: "IE",
        legal_code: "S35A",
        description: "REINSTATEMENT OF APPLICATION FOR A PATENT (ACC. SECT 35A, PATENTS LAW 1992 - AMENDMENTS 2006)"
    },
    {
        country_code: "IE",
        legal_code: "SPCD",
        description: "AMENDMENT OF DATE OF FILING (SUPPLEMENTARY PROTECTION CERTIFICATES)"
    },
    {
        country_code: "IE",
        legal_code: "SPCE",
        description: "APPLICATION FOR EXTENSION FOR THE DURATION OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "IE",
        legal_code: "SPCF",
        description: "REQUEST FOR GRANT OF SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "IE",
        legal_code: "SPCG",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE GRANTED"
    },
    {
        country_code: "IE",
        legal_code: "SPCI",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE DECLARED INVALID"
    },
    {
        country_code: "IE",
        legal_code: "SPCR",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE REJECTED"
    },
    {
        country_code: "IE",
        legal_code: "SPCW",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE WITHDRAWN"
    },
    {
        country_code: "IE",
        legal_code: "SPCX",
        description: "CORRECTION OF AN ERRATUM IN THE GAZETTE CONCERNING AN SPC"
    },
    {
        country_code: "IE",
        legal_code: "SPCY",
        description: "GRANT OF EXTENSION OF DURATION OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "IE",
        legal_code: "SPCZ",
        description: "GRANT OF EXTENSION OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "IE",
        legal_code: "TRCL",
        description: "TRANSLATION OF CLAIMS OF EUROPEAN PATENT APPLICATIONS DESIGNATING THE STATE - SECTION 120(6)"
    },
    {
        country_code: "IL",
        legal_code: "CB",
        description: "OPPOSITIONS FILED AGAINST GRANT OF PATENTS"
    },
    {
        country_code: "IL",
        legal_code: "CDA",
        description: "OPEN TO OPPOSITION (SECT. 171 AND 172 0F PATENTS LAW, 5727-1967 AND REGULATION 149 OF THE PATENT REGULATION)"
    },
    {
        country_code: "IL",
        legal_code: "CE",
        description: "APPLICATION WITHDRAWN (OPPOS. FILED AGAINST GRANT OF PATENTS)"
    },
    {
        country_code: "IL",
        legal_code: "CO",
        description: "OPPOSITION CANCELLED (OPPOS. FILED AGAINST GRANT OF PATENTS)"
    },
    {
        country_code: "IL",
        legal_code: "CT",
        description: "PERMISSION HAS BEEN GRANTED TO AMEND TITLE OF INVENTION IN PATENTS REGISTER (PATENT LAW 5727-1967 SECTION 170(B))"
    },
    {
        country_code: "IL",
        legal_code: "DC",
        description: "PATENT CERTIFICATE GRANTED AFTER AMENDMENT OF SPECIFICATION (OPPOS. FILED AGAINST GRANT OF PATENTS)"
    },
    {
        country_code: "IL",
        legal_code: "DCB",
        description: "OPPOSITIONS FILED TO APPLICATIONS FOR AMENDING PATENT SPECIFICATION"
    },
    {
        country_code: "IL",
        legal_code: "DOC",
        description: "OPPOSITION CANCELLED (OPPOS. FILED TO APPLICATIONS FOR AMENDING PATENT SPECIFICATION)"
    },
    {
        country_code: "IL",
        legal_code: "ERR",
        description: "CORRIGENDUM"
    },
    {
        country_code: "IL",
        legal_code: "EXP",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "IL",
        legal_code: "EXTC",
        description: "PATENT EXTENSION CANCELLED"
    },
    {
        country_code: "IL",
        legal_code: "EXTE",
        description: "PERIOD FOR FILING APPLICATION FOR EXTENSION ORDER HAS BEEN EXTENDED (SECTION 64P.(4))"
    },
    {
        country_code: "IL",
        legal_code: "EXTF",
        description: "APPLICATION FOR PATENT EXTENSION FILED"
    },
    {
        country_code: "IL",
        legal_code: "EXTG",
        description: "PATENT EXTENSION ORDER GRANTED"
    },
    {
        country_code: "IL",
        legal_code: "EXTH",
        description: "PATENT EXTENSION ORDER CORRECTED (SECT. 64P(2))"
    },
    {
        country_code: "IL",
        legal_code: "EXTN",
        description: "EXTENSION ORDERS RENEWED"
    },
    {
        country_code: "IL",
        legal_code: "EXTP",
        description: "APPLICATION FOR EXTENSION ORDERS IS PENDING"
    },
    {
        country_code: "IL",
        legal_code: "FF",
        description: "PATENTS GRANTED"
    },
    {
        country_code: "IL",
        legal_code: "FGCE",
        description: "PATENTS GRANTED AFTER REMOVAL OF OPPOSITION"
    },
    {
        country_code: "IL",
        legal_code: "GE",
        description: "APPLICATION FOR COMPULSORY LICENCE (SECTION 124(A) PATENTS LAW 5727-1967"
    },
    {
        country_code: "IL",
        legal_code: "HC",
        description: "CHANGES OF NAME OF PROPRIETORS"
    },
    {
        country_code: "IL",
        legal_code: "HCA",
        description: "CHANGES OF NAME OF PROPRIETORS AFTER AMALGAMATION"
    },
    {
        country_code: "IL",
        legal_code: "HCE",
        description: "CHANGES OF NAME AND ADDRESS OF PROPRIETORS"
    },
    {
        country_code: "IL",
        legal_code: "HE",
        description: "CHANGES OF ADDRESS OF PROPRIETORS"
    },
    {
        country_code: "IL",
        legal_code: "HK",
        description: "CORRIGENDUM"
    },
    {
        country_code: "IL",
        legal_code: "HP",
        description: "CHANGES IN PROPRIETORSHIP"
    },
    {
        country_code: "IL",
        legal_code: "HQ",
        description: "CHANGE OF AGENTS"
    },
    {
        country_code: "IL",
        legal_code: "HS",
        description: "CHANGES OF ADDRESS FOR SERVICE"
    },
    {
        country_code: "IL",
        legal_code: "KB",
        description: "PATENTS RENEWED"
    },
    {
        country_code: "IL",
        legal_code: "KB20",
        description: "PATENT RENEWED FOR 20 YEARS"
    },
    {
        country_code: "IL",
        legal_code: "ME",
        description: "APPLICATIONS FOR PATENT REVOCATION FILED"
    },
    {
        country_code: "IL",
        legal_code: "MEA",
        description: "APPLICATION CANCELLED (APPLIC. FOR PATENT REVOCATION FILED)"
    },
    {
        country_code: "IL",
        legal_code: "MF",
        description: "PATENT REVOKED"
    },
    {
        country_code: "IL",
        legal_code: "MFC",
        description: "REVOKED BY DECISION OF THE COMMISSIONER (APPLIC. FOR PAT. REVOCATION FILED)"
    },
    {
        country_code: "IL",
        legal_code: "MFD",
        description: "PATENT CANCELLED BY DECISION OF COMMISSIONER"
    },
    {
        country_code: "IL",
        legal_code: "MISC",
        description: "MISCELLANEOUS"
    },
    {
        country_code: "IL",
        legal_code: "MM9K",
        description: "PATENT NOT IN FORCE DUE TO NON-PAYMENT OF RENEWAL FEES"
    },
    {
        country_code: "IL",
        legal_code: "NE",
        description: "APPLICATION FOR RESTORATION - PATENT LAPSED THROUGH NON-PAYMENT OF RENEWAL FEES (SECTION 60, PATENTS LAW, 5727-1967)"
    },
    {
        country_code: "IL",
        legal_code: "NEC",
        description: "OPPOSITION FILED AGAINST RESTORATION OF A PATENT"
    },
    {
        country_code: "IL",
        legal_code: "NF",
        description: "PATENTS RESTORED"
    },
    {
        country_code: "IL",
        legal_code: "NG",
        description: "GRANTED (IN OPPOSITION PROCEEDINGS) - SECT. 29 AND 66 , PATENTS LAW, 5727-1967"
    },
    {
        country_code: "IL",
        legal_code: "NOTI",
        description: "NOTICE IN THE OFFICIAL GAZETTE"
    },
    {
        country_code: "IL",
        legal_code: "NP",
        description: "PERMISSION FOR AMENDING THE PATENT SPECIFICATION GRANTED (SECTION 66, PATENTS LAW 1967)"
    },
    {
        country_code: "IL",
        legal_code: "PEL",
        description: "INTENSION OF COMMISSIONER TO EXTEND PERIOD OF PROTECTION"
    },
    {
        country_code: "IL",
        legal_code: "QB",
        description: "LICENCES GRANTED"
    },
    {
        country_code: "IL",
        legal_code: "RH",
        description: "PATENTS VOID"
    },
    {
        country_code: "IL",
        legal_code: "RH1",
        description: "PATENTS NOT IN FORCE"
    },
    {
        country_code: "IL",
        legal_code: "TBA",
        description: "ADDITION OF INVENTOR'S NAMES"
    },
    {
        country_code: "IT",
        legal_code: "0001",
        description: "GRANTED"
    },
    {
        country_code: "IT",
        legal_code: "0002",
        description: "REJECTED"
    },
    {
        country_code: "IT",
        legal_code: "0003",
        description: "WITHDRAWN"
    },
    {
        country_code: "IT",
        legal_code: "0004",
        description: "CONVERTED TO UTILITY MODEL"
    },
    {
        country_code: "IT",
        legal_code: "FIT",
        description: "SPC for herbicidal products: no action taken"
    },
    {
        country_code: "IT",
        legal_code: "FITA",
        description: "SPC for herbicidal products: examined"
    },
    {
        country_code: "IT",
        legal_code: "FITB",
        description: "SPC for herbicidal products: suspended"
    },
    {
        country_code: "IT",
        legal_code: "FITC",
        description: "SPC for herbicidal products: partially granted"
    },
    {
        country_code: "IT",
        legal_code: "FITD",
        description: "SPC for herbicidal products: granted"
    },
    {
        country_code: "IT",
        legal_code: "FITE",
        description: "SPC for herbicidal products: interlocutary refusal"
    },
    {
        country_code: "IT",
        legal_code: "FITF",
        description: "SPC for herbicidal products: office refusal"
    },
    {
        country_code: "IT",
        legal_code: "FITG",
        description: "SPC for herbicidal products: definitive refusal"
    },
    {
        country_code: "IT",
        legal_code: "FITH",
        description: "SPC for herbicidal products: Board of Appeal"
    },
    {
        country_code: "IT",
        legal_code: "FITI",
        description: "SPC for herbicidal products: Court of Cassation"
    },
    {
        country_code: "IT",
        legal_code: "FITL",
        description: "SPC for herbicidal products: Court of Justice"
    },
    {
        country_code: "IT",
        legal_code: "FITM",
        description: "SPC for herbicidal products: Withdrawal of SPC application"
    },
    {
        country_code: "IT",
        legal_code: "FITN",
        description: "SPC for herbicidal products: Annulment of SPC"
    },
    {
        country_code: "IT",
        legal_code: "FITO",
        description: "SPC for herbicidal products: Expiry"
    },
    {
        country_code: "IT",
        legal_code: "FITP",
        description: "SPC for herbicidal products: Renunciation of SPC"
    },
    {
        country_code: "IT",
        legal_code: "ITCP",
        description: "COMPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "IT",
        legal_code: "MED",
        description: "SPC for pharmaceutical products: no action taken"
    },
    {
        country_code: "IT",
        legal_code: "MEDA",
        description: "SPC for pharmaceutical products: examined"
    },
    {
        country_code: "IT",
        legal_code: "MEDB",
        description: "SPC for pharmaceutical products: suspended"
    },
    {
        country_code: "IT",
        legal_code: "MEDC",
        description: "SPC for pharmaceutical products: partially granted"
    },
    {
        country_code: "IT",
        legal_code: "MEDD",
        description: "SPC for pharmaceutical products: granted"
    },
    {
        country_code: "IT",
        legal_code: "MEDE",
        description: "SPC for pharmaceutical products: interlocutary refusal"
    },
    {
        country_code: "IT",
        legal_code: "MEDF",
        description: "SPC for pharmaceutical products: office refusal"
    },
    {
        country_code: "IT",
        legal_code: "MEDG",
        description: "SPC for pharmaceutical products: definitive refusal"
    },
    {
        country_code: "IT",
        legal_code: "MEDH",
        description: "SPC for pharmaceutical products: Board of Appeal"
    },
    {
        country_code: "IT",
        legal_code: "MEDI",
        description: "SPC for pharmaceutical products: Court of Cassation"
    },
    {
        country_code: "IT",
        legal_code: "MEDL",
        description: "SPC for pharmaceutical products: Court of Justice"
    },
    {
        country_code: "IT",
        legal_code: "MEDM",
        description: "SPC for pharmaceutical products: Withdrawal of SPC application"
    },
    {
        country_code: "IT",
        legal_code: "MEDN",
        description: "SPC for pharmaceutical products: Annulment of SPC"
    },
    {
        country_code: "IT",
        legal_code: "MEDO",
        description: "SPC for pharmaceutical products: Expiry"
    },
    {
        country_code: "IT",
        legal_code: "MEDP",
        description: "SPC for pharmaceutical products: Renunciation of SPC"
    },
    {
        country_code: "IT",
        legal_code: "TA",
        description: "FEE PAYMENT DATE (SITUATION AS OF PRS-DATE), DATA COLLECTED SINCE 19931001"
    },
    {
        country_code: "JP",
        legal_code: "A01",
        description: "WRITTEN DECISION TO GRANT A PATENT OR TO GRANT A REGISTRATION (UTILITY MODEL)"
    },
    {
        country_code: "JP",
        legal_code: "A02",
        description: "DECISION OF REFUSAL"
    },
    {
        country_code: "JP",
        legal_code: "A045",
        description: "WRITTEN MEASURE OF DISMISSAL OF APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "A072",
        description: "DISMISSAL OF PROCEDURE"
    },
    {
        country_code: "JP",
        legal_code: "A131",
        description: "NOTIFICATION OF REASONS FOR REFUSAL"
    },
    {
        country_code: "JP",
        legal_code: "A256",
        description: "WRITTEN NOTIFICATION OF CO-PENDING APPLICATION FILED ON THE SAME DATE BY DIFFERENT APPLICANTS"
    },
    {
        country_code: "JP",
        legal_code: "A25B",
        description: "WRITTEN NOTIFICATION OF IMPOSSIBILITY TO EXAMINE BECAUSE OF NO REQUEST FOR PRECEDENT APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "A312",
        description: "SUSPENSION OF RETURNING"
    },
    {
        country_code: "JP",
        legal_code: "A313",
        description: "FINAL DECISION OF REJECTION WITHOUT A DISSENTING RESPONSE FROM THE APPLICANT"
    },
    {
        country_code: "JP",
        legal_code: "A521",
        description: "WRITTEN AMENDMENT"
    },
    {
        country_code: "JP",
        legal_code: "A524",
        description: "WRITTEN SUBMISSION OF COPY OF AMENDMENT UNDER SECTION 19 (PCT)"
    },
    {
        country_code: "JP",
        legal_code: "A529",
        description: "WRITTEN SUBMISSION OF COPY OF AMENDMENT UNDER SECTION 34 (PCT)"
    },
    {
        country_code: "JP",
        legal_code: "A59",
        description: "WRITTEN PLEA"
    },
    {
        country_code: "JP",
        legal_code: "A601",
        description: "WRITTEN REQUEST FOR EXTENSION OF TIME"
    },
    {
        country_code: "JP",
        legal_code: "A602",
        description: "WRITTEN PERMISSION OF EXTENSION OF TIME"
    },
    {
        country_code: "JP",
        legal_code: "A61",
        description: "FIRST PAYMENT OF ANNUAL FEES (DURING GRANT PROCEDURE)"
    },
    {
        country_code: "JP",
        legal_code: "A621",
        description: "WRITTEN REQUEST FOR APPLICATION EXAMINATION"
    },
    {
        country_code: "JP",
        legal_code: "A623",
        description: "REGISTRABILITY REPORT"
    },
    {
        country_code: "JP",
        legal_code: "A624",
        description: "REGISTRABILITY REPORT (OTHER PERSON)"
    },
    {
        country_code: "JP",
        legal_code: "A625",
        description: "WRITTEN REQUEST FOR APPLICATION EXAMINATION (BY OTHER PERSON)"
    },
    {
        country_code: "JP",
        legal_code: "A711",
        description: "NOTIFICATION OF CHANGE IN APPLICANT"
    },
    {
        country_code: "JP",
        legal_code: "A72",
        description: "NOTIFICATION OF CHANGE IN NAME OF APPLICANT"
    },
    {
        country_code: "JP",
        legal_code: "A761",
        description: "WRITTEN WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "A762",
        description: "WRITTEN ABANDONMENT OF APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "A764",
        description: "WRITTEN WITHDRAWAL OF PRIORITY CLAIM"
    },
    {
        country_code: "JP",
        legal_code: "A80",
        description: "WRITTEN REQUEST TO APPLY EXCEPTIONS TO LACK OF NOVELTY OF INVENTION"
    },
    {
        country_code: "JP",
        legal_code: "A87",
        description: "EXPLANATION OF CIRCUMSTANCES CONCERNING PREFERENTIAL EXAMINATION"
    },
    {
        country_code: "JP",
        legal_code: "A871",
        description: "EXPLANATION OF CIRCUMSTANCES CONCERNING ACCELERATED EXAMINATION"
    },
    {
        country_code: "JP",
        legal_code: "A911",
        description: "TRANSFER OF RECONSIDERATION BY EXAMINER BEFORE APPEAL (ZENCHI)"
    },
    {
        country_code: "JP",
        legal_code: "A912",
        description: "REMOVAL OF RECONSIDERATION BY EXAMINER BEFORE APPEAL (ZENCHI)"
    },
    {
        country_code: "JP",
        legal_code: "A975",
        description: "REPORT ON ACCELERATED EXAMINATION"
    },
    {
        country_code: "JP",
        legal_code: "A977",
        description: "REPORT ON RETRIEVAL"
    },
    {
        country_code: "JP",
        legal_code: "AA23",
        description: "NOTIFICATION OF UTILITY MODEL REGISTRABILITY"
    },
    {
        country_code: "JP",
        legal_code: "AA64",
        description: "NOTIFICATION OF INVALIDATION OF CLAIM OF INTERNAL PRIORITY (WITH TERM)"
    },
    {
        country_code: "JP",
        legal_code: "AA91",
        description: "NOTIFICATION OF REVOCATION BY EX OFFICIO"
    },
    {
        country_code: "JP",
        legal_code: "AA92",
        description: "NOTIFICATION OF INVALIDATION"
    },
    {
        country_code: "JP",
        legal_code: "ABAN",
        description: "CANCELLATION OF ABANDONMENT"
    },
    {
        country_code: "JP",
        legal_code: "AX71",
        description: "INTERRUPTION"
    },
    {
        country_code: "JP",
        legal_code: "AX72",
        description: "REMOVAL OF INTERRUPTION"
    },
    {
        country_code: "JP",
        legal_code: "CANC",
        description: "CANCELLATION OF A RIGHT AFTER REGISTRATION"
    },
    {
        country_code: "JP",
        legal_code: "EXPY",
        description: "CANCELLATION BECAUSE OF COMPLETION OF TERM"
    },
    {
        country_code: "JP",
        legal_code: "FPAY",
        description: "RENEWAL FEE PAYMENT (PRS DATE IS RENEWAL DATE OF DATABASE)"
    },
    {
        country_code: "JP",
        legal_code: "LAPF",
        description: "CANCELLATION BECAUSE OF NO PAYMENT OF DEFERRING PATENT OR REGISTRATION FEES"
    },
    {
        country_code: "JP",
        legal_code: "LAPS",
        description: "CANCELLATION BECAUSE OF NO PAYMENT OF ANNUAL FEES"
    },
    {
        country_code: "JP",
        legal_code: "R150",
        description: "CERTIFICATE OF PATENT (=GRANT) OR REGISTRATION OF UTILITY MODEL"
    },
    {
        country_code: "JP",
        legal_code: "R153",
        description: "GRANT OF PATENT TERM EXTENSION"
    },
    {
        country_code: "JP",
        legal_code: "R154",
        description: "CERTIFICATE OF PATENT OR UTILITY MODEL (REISSUE)"
    },
    {
        country_code: "JP",
        legal_code: "R155",
        description: "NOTIFICATION BEFORE DISPOSITION OF DECLINING OF APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "R157",
        description: "CERTIFICATE OF PATENT OR UTILITY MODEL (CORRECTION)"
    },
    {
        country_code: "JP",
        legal_code: "R230",
        description: "WRITTEN CORRECTION (DELETION OF CLAIMS)"
    },
    {
        country_code: "JP",
        legal_code: "R231",
        description: "WRITTEN CORRECTION (DESCRIPTIONS, ETC.)"
    },
    {
        country_code: "JP",
        legal_code: "R250",
        description: "RECEIPT OF ANNUAL FEES"
    },
    {
        country_code: "JP",
        legal_code: "R255",
        description: "NOTIFICATION OF EXCLUSION FROM APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "R350",
        description: "WRITTEN NOTIFICATION OF REGISTRATION OF TRANSFER"
    },
    {
        country_code: "JP",
        legal_code: "R360",
        description: "WRITTEN NOTIFICATION FOR DECLINING OF TRANSFER OF RIGHTS"
    },
    {
        country_code: "JP",
        legal_code: "R370",
        description: "WRITTEN MEASURE OF DECLINING OF TRANSFER PROCEDURE"
    },
    {
        country_code: "JP",
        legal_code: "R371",
        description: "TRANSFER WITHDRAWN"
    },
    {
        country_code: "JP",
        legal_code: "R92",
        description: "NOTIFIFCATION OF INVALIDATION"
    },
    {
        country_code: "JP",
        legal_code: "RD01",
        description: "NOTIFICATION OF CHANGE OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD02",
        description: "NOTIFICATION OF ACCEPTANCE OF POWER OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD03",
        description: "NOTIFICATION OF APPOINTMENT OF POWER OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD04",
        description: "NOTIFICATION OF RESIGNATION OF POWER OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD05",
        description: "NOTIFICATION OF REVOCATION OF POWER OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD07",
        description: "NOTIFICATION OF EXTINGUISHMENT OF POWER OF ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD12",
        description: "NOTIFICATION OF ACCEPTANCE OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD13",
        description: "NOTIFICATION OF APPOINTMENT OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD14",
        description: "NOTIFICATION OF RESIGNATION OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD15",
        description: "NOTIFICATION OF REVOCATION OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD16",
        description: "NOTIFICATION OF CHANGE OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD17",
        description: "NOTIFICATION OF EXTINGUISHMENT OF POWER OF SUB ATTORNEY"
    },
    {
        country_code: "JP",
        legal_code: "RD99",
        description: "WRITTEN REQUEST FOR REGISTRATION OF RESTORE"
    },
    {
        country_code: "JP",
        legal_code: "RG99",
        description: "WRITTEN REQUEST FOR PROVISIONAL REGISTRATION"
    },
    {
        country_code: "JP",
        legal_code: "RVAP",
        description: "CANCELLATION OF A RIGHT AFTER REGISTRATION BECAUSE OF MISSING APPLICATION OR INVALIDATION OF APPLICATION"
    },
    {
        country_code: "JP",
        legal_code: "RVOP",
        description: "CANCELLATION BY POST-GRANT OPPOSITION"
    },
    {
        country_code: "JP",
        legal_code: "RVTR",
        description: "CANCELLATION OF DETERMINATION OF TRIAL FOR INVALIDATION"
    },
    {
        country_code: "JP",
        legal_code: "S111",
        description: "REQUEST FOR CHANGE OF OWNERSHIP OR PART OF OWNERSHIP"
    },
    {
        country_code: "JP",
        legal_code: "S131",
        description: "REQUEST FOR TRUST REGISTRATION OF TRANSFER OF RIGHT"
    },
    {
        country_code: "JP",
        legal_code: "S199",
        description: "WRITTEN REQUEST FOR REGISTRATION OF TRANSFER OF RIGHT"
    },
    {
        country_code: "JP",
        legal_code: "S201",
        description: "REQUEST FOR REGISTRATION OF EXCLUSIVE LICENCE"
    },
    {
        country_code: "JP",
        legal_code: "S202",
        description: "REQUEST FOR REGISTRATION OF NON-EXCLUSIVE LICENCE"
    },
    {
        country_code: "JP",
        legal_code: "S211",
        description: "WRITTEN REQUEST FOR REGISTRATION OF TRANSFER OF EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "S212",
        description: "WRITTEN REQUEST FOR REGISTRATION OF TRANSFER OF NON-EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "S221",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE OF EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "S222",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE OF NON-EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "S231",
        description: "WRITTEN CORRECTION (DESCRIPTIONS, ETC.)"
    },
    {
        country_code: "JP",
        legal_code: "S303",
        description: "WRITTEN REQUEST FOR REGISTRATION OF PLEDGE OR CHANGE OF PLEDGE"
    },
    {
        country_code: "JP",
        legal_code: "S321",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE IN PLEDGE AGREEMENT"
    },
    {
        country_code: "JP",
        legal_code: "S343",
        description: "WRITTEN REQUEST FOR REGISTRATION OF ROOT PLEDGE OR CHANGE OF ROOT PLEDGE"
    },
    {
        country_code: "JP",
        legal_code: "S350",
        description: "WRITTEN NOTIFICATION OF REGISTRATION OF TRANSFER"
    },
    {
        country_code: "JP",
        legal_code: "S531",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE OF DOMICILE"
    },
    {
        country_code: "JP",
        legal_code: "S533",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE OF NAME"
    },
    {
        country_code: "JP",
        legal_code: "S534",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CHANGE OF NATIONALITY"
    },
    {
        country_code: "JP",
        legal_code: "S631",
        description: "WRITTEN REQUEST FOR REGISTRATION OF RECLAMATION OF DOMICILE"
    },
    {
        country_code: "JP",
        legal_code: "S633",
        description: "WRITTEN REQUEST FOR REGISTRATION OF RECLAMATION OF NAME"
    },
    {
        country_code: "JP",
        legal_code: "S634",
        description: "WRITTEN REQUEST FOR REGISTRATION OF RECLAMATION OF NATIONALITY"
    },
    {
        country_code: "JP",
        legal_code: "S801",
        description: "WRITTEN REQUEST FOR REGISTRATION OF ABANDONMENT OF RIGHT"
    },
    {
        country_code: "JP",
        legal_code: "S802",
        description: "WRITTEN REQUEST FOR REGISTRATION OF PARTIAL ABANDONMENT OF RIGHT"
    },
    {
        country_code: "JP",
        legal_code: "S803",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CANCELLATION OF PROVISIONAL REGISTRATION"
    },
    {
        country_code: "JP",
        legal_code: "S804",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CANCELLATION OF EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "S805",
        description: "WRITTEN REQUEST FOR REGISTRATION OF CANCELLATION OF NON-EXCLUSIVE LICENSE"
    },
    {
        country_code: "JP",
        legal_code: "SG99",
        description: "WRITTEN REQUEST FOR REGISTRATION OF RESTORE"
    },
    {
        country_code: "JP",
        legal_code: "SZ02",
        description: "WRITTEN REQUEST FOR TRUST REGISTRATION"
    },
    {
        country_code: "JP",
        legal_code: "SZ03",
        description: "WRITTEN REQUEST FOR CANCELLATION OF TRUST REGISTRATION"
    },
    {
        country_code: "JP",
        legal_code: "TRDD",
        description: "DECISION OF GRANT OR REJECTION WRITTEN"
    },
    {
        country_code: "LT",
        legal_code: "FD9A",
        description: "WITHDRAWN APPLICATIONS"
    },
    {
        country_code: "LT",
        legal_code: "GB9A",
        description: "TRANSFER OF PATENT APPLICATION"
    },
    {
        country_code: "LT",
        legal_code: "HK9A",
        description: "RECTIFICATIONS: PATENT APPLICATIONS"
    },
    {
        country_code: "LT",
        legal_code: "MA9A",
        description: "PATENT REVOKED"
    },
    {
        country_code: "LT",
        legal_code: "MC9A",
        description: "CANCELLATION DUE TO NON-PAYMENT"
    },
    {
        country_code: "LT",
        legal_code: "MG4D",
        description: "INVALIDATED EUROPEAN PATENT"
    },
    {
        country_code: "LT",
        legal_code: "MG9A",
        description: "PATENT INVALIDATED"
    },
    {
        country_code: "LT",
        legal_code: "MG9D",
        description: "INVALIDATION OF EXTENSION OF EUROPEAN PATENTS"
    },
    {
        country_code: "LT",
        legal_code: "MK9A",
        description: "EXPIRY OF A PATENT"
    },
    {
        country_code: "LT",
        legal_code: "MM4D",
        description: "LAPSE EUROPEAN PATENT"
    },
    {
        country_code: "LT",
        legal_code: "MM9A",
        description: "LAPSED PATENTS"
    },
    {
        country_code: "LT",
        legal_code: "MM9D",
        description: "CANCELATION OF EXTENSION OF EUROPEAN PATENT"
    },
    {
        country_code: "LT",
        legal_code: "ND9D",
        description: "FILING A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "LT",
        legal_code: "PC9A",
        description: "TRANSFER OF PATENTS"
    },
    {
        country_code: "LT",
        legal_code: "PD9A",
        description: "CHANGE OF THE GRANTEE"
    },
    {
        country_code: "LT",
        legal_code: "QA9A",
        description: "LICENSE OF RIGHT PUBLISHED"
    },
    {
        country_code: "LT",
        legal_code: "QB9A",
        description: "LICENSING"
    },
    {
        country_code: "LT",
        legal_code: "RL9D",
        description: "CHANGED CLAIMS OF EXTENDED EUROPEAN PATENT PUBLISHED ACCORDING ART. 54 PATENT LAW"
    },
    {
        country_code: "LT",
        legal_code: "SPCE",
        description: "FILING AN EXTENSION OF AN SPC (FOR PAEDIATRIC MEDICAMENTS)"
    },
    {
        country_code: "LT",
        legal_code: "SPCF",
        description: "FILING AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCG",
        description: "GRANT OF AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCM",
        description: "CHANGE OF REPRESENTATIVE OF AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCR",
        description: "REJECTION OF AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCT",
        description: "CHANGE OF OWNERSHIP OF AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCW",
        description: "WITHDRAWAL OF AN SPC"
    },
    {
        country_code: "LT",
        legal_code: "SPCZ",
        description: "GRANT OF EXTENSION OF AN SPC (FOR PAEDIATRIC MEDICAMENTS)"
    },
    {
        country_code: "LT",
        legal_code: "SPGR",
        description: "GRANT OF SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "LT",
        legal_code: "SPLA",
        description: "LAPSE OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "LT",
        legal_code: "TA9A",
        description: "CHANGE OF PATENT INVENTOR"
    },
    {
        country_code: "LT",
        legal_code: "TC9A",
        description: "CHANGE OF REPRESENTATIVE"
    },
    {
        country_code: "LT",
        legal_code: "TH9A",
        description: "CHANGES IN PATENT TITLE/CLAIMS"
    },
    {
        country_code: "LT",
        legal_code: "TK9A",
        description: "RECTIFICATIONS: PATENTS"
    },
    {
        country_code: "LU",
        legal_code: "CCP",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "LU",
        legal_code: "CCPY",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE FOR PLANT PROTECTION"
    },
    {
        country_code: "LU",
        legal_code: "CNA",
        description: "CHANGE OF HOLDER'S NAME OR ADDRESS"
    },
    {
        country_code: "LU",
        legal_code: "DT",
        description: "APPLICATION DATE"
    },
    {
        country_code: "LU",
        legal_code: "DV",
        description: "DIVERS"
    },
    {
        country_code: "LU",
        legal_code: "NAN",
        description: "MORTGAGE"
    },
    {
        country_code: "LU",
        legal_code: "RE",
        description: "REESTABLISHMENT"
    },
    {
        country_code: "LU",
        legal_code: "RECT",
        description: "CORRECTION"
    },
    {
        country_code: "LU",
        legal_code: "TA",
        description: "ANNUAL FEE"
    },
    {
        country_code: "LU",
        legal_code: "TP",
        description: "TRANSFER OF RIGHTS"
    },
    {
        country_code: "MC",
        legal_code: "BN",
        description: "ABANDONED"
    },
    {
        country_code: "MC",
        legal_code: "NN",
        description: "ANNULMENT"
    },
    {
        country_code: "MC",
        legal_code: "PED",
        description: "NOT YET GRANTED"
    },
    {
        country_code: "MC",
        legal_code: "REF",
        description: "A CORRESPONDS TO WO-APPL."
    },
    {
        country_code: "MC",
        legal_code: "YP",
        description: "ANNUAL FEE PAID"
    },
    {
        country_code: "MD",
        legal_code: "1K4A",
        description: "PAYMENT OF ANNUAL FEES"
    },
    {
        country_code: "MD",
        legal_code: "1M4A",
        description: "EXPIRATION OF TERMS"
    },
    {
        country_code: "MD",
        legal_code: "AA1A",
        description: "FILED APPLICATION (DIVISIONAL OR CONVERTED FROM UTILITY MODEL APPLICATION)"
    },
    {
        country_code: "MD",
        legal_code: "AA1K",
        description: "FILED APPLICATION (DIVISIONAL OR CONVERTED FROM PATENT APPLICATION)"
    },
    {
        country_code: "MD",
        legal_code: "AB9A",
        description: "DIVISIONAL APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "AB9K",
        description: "DIVISIONAL APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "AE9A",
        description: "RESTORATION OF LAPSED OF FORFEITED APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "BB1A",
        description: "PUBLISHED APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "BB1K",
        description: "PUBLISHED APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "CD4A",
        description: "APPLICATION REFUSED FOLLOWING OPPOSITION"
    },
    {
        country_code: "MD",
        legal_code: "CD4K",
        description: "APPLICATION REFUSED FOLLOWING OPPOSITION"
    },
    {
        country_code: "MD",
        legal_code: "CHPR",
        description: "Change of Proprietorship"
    },
    {
        country_code: "MD",
        legal_code: "FA1A",
        description: "Withdrawn Applications"
    },
    {
        country_code: "MD",
        legal_code: "FA2A",
        description: "Withdrawn Applications"
    },
    {
        country_code: "MD",
        legal_code: "FA9A",
        description: "ABANDONMENT OR WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "FA9K",
        description: "ABANDONMENT OR WITHDRAWAL OF APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "FC2A",
        description: "Rejected Applications"
    },
    {
        country_code: "MD",
        legal_code: "FC9A",
        description: "REFUSAL OF APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "FC9K",
        description: "REFUSAL OF APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "FD3A",
        description: "Lapsed Patents"
    },
    {
        country_code: "MD",
        legal_code: "FD4A",
        description: "Lapsed Patents"
    },
    {
        country_code: "MD",
        legal_code: "FF4A",
        description: "PATENT GRANTED"
    },
    {
        country_code: "MD",
        legal_code: "FF4K",
        description: "CERTIFICATE GRANTED"
    },
    {
        country_code: "MD",
        legal_code: "FG3A",
        description: "Granted Patents"
    },
    {
        country_code: "MD",
        legal_code: "FG4A",
        description: "PATENTS ISSUED"
    },
    {
        country_code: "MD",
        legal_code: "FG4K",
        description: "CERTIFICATE ISSUED"
    },
    {
        country_code: "MD",
        legal_code: "FG9Y",
        description: "SHORT TERM PATENT ISSUED"
    },
    {
        country_code: "MD",
        legal_code: "FH4A",
        description: "PATENT ISSUED ON THE BASIS OF RECOGNITION OF INVENTOR'S CERTIFICATE OF FORMER USSR"
    },
    {
        country_code: "MD",
        legal_code: "GA9A",
        description: "CONVERSION FROM PATENT APPLICATION TO APPLICATION FOR REGISTRATION OF A UTILITY MODEL"
    },
    {
        country_code: "MD",
        legal_code: "GA9K",
        description: "CONVERSION FROM APPLICATION FOR REGISTRATION OF A UTILITY MODEL TO PATENT APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "GB9A",
        description: "CHANGE OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "GB9K",
        description: "CHANGE OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "HA9A",
        description: "CHANGE OF INVENTORSHIP IN APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "HA9K",
        description: "CHANGE OF INVENTORSHIP IN APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "HB9A",
        description: "CORRECTION OF NAME OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "HB9K",
        description: "CORRECTION OF NAME OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "HC9A",
        description: "CHANGE OF NAME OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "HC9K",
        description: "CHANGE OF NAME OF APPLICANT"
    },
    {
        country_code: "MD",
        legal_code: "HK9A",
        description: "ERRATUM IN OFFICIAL GAZETTE WITH REGARD TO APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "HK9K",
        description: "ERROR IN OFFICIAL GAZETTE WITH REGARD TO APPLICATION"
    },
    {
        country_code: "MD",
        legal_code: "IF99",
        description: "Valid Patents on 19990615"
    },
    {
        country_code: "MD",
        legal_code: "KA4A",
        description: "PATENT LAPSED THROUGH NON-PAYMENT OF FEES (WITH THE RIGHT OF REVALIDATION UNDER ART. 30(3) OF PATENT LAW)"
    },
    {
        country_code: "MD",
        legal_code: "KA4K",
        description: "CERTIFICATE OF REGISTRATION LAPSED THROUGH NON-PAYMENT OF FEES (WITH THE RIGHT OF REVALIDATION)"
    },
    {
        country_code: "MD",
        legal_code: "LD4A",
        description: "LIMITIATION OF THE PATENT"
    },
    {
        country_code: "MD",
        legal_code: "MB4A",
        description: "PATENT SURRENDERED"
    },
    {
        country_code: "MD",
        legal_code: "MB4K",
        description: "CERTIFICATE OF REGISTRATION SURRENDERED"
    },
    {
        country_code: "MD",
        legal_code: "MC4A",
        description: "PATENT REVOKED"
    },
    {
        country_code: "MD",
        legal_code: "MC4K",
        description: "CERTIFICATE OF REGISTRATION REVOKED"
    },
    {
        country_code: "MD",
        legal_code: "MK4A",
        description: "PAYMENT FOR MAINTENANCE UP TO GIVEN DATE (LAPSES SOON AFTER)"
    },
    {
        country_code: "MD",
        legal_code: "MK4K",
        description: "CERTIFICATE OF REGISTRATION EXPIRED"
    },
    {
        country_code: "MD",
        legal_code: "MM3A",
        description: "PATENT DEFINITELY LAPSED"
    },
    {
        country_code: "MD",
        legal_code: "MM4A",
        description: "PATENT DEFINITELY LAPSED"
    },
    {
        country_code: "MD",
        legal_code: "MM4K",
        description: "CERTIFICATE OF REGISTRATION DEFINITIVELY LAPSED THROUGH NON-PAYMENT OF FEES"
    },
    {
        country_code: "MD",
        legal_code: "ND4K",
        description: "RENEWAL OF THE REGISTRATION"
    },
    {
        country_code: "MD",
        legal_code: "NF4A",
        description: "RESTORATION OF LAPSED PATENT"
    },
    {
        country_code: "MD",
        legal_code: "NF4K",
        description: "RESTORATION OF LAPSED UTILITY MODEL"
    },
    {
        country_code: "MD",
        legal_code: "PC3A",
        description: "Transfer or Assignments"
    },
    {
        country_code: "MD",
        legal_code: "PC4A",
        description: "Transfer or Assignments"
    },
    {
        country_code: "MD",
        legal_code: "PD4A",
        description: "CHANGE OF PROPRIETORSHIP"
    },
    {
        country_code: "MD",
        legal_code: "PD4K",
        description: "CHANGE OF PROPRIETORSHIP"
    },
    {
        country_code: "MD",
        legal_code: "PD99",
        description: "Pending Applications"
    },
    {
        country_code: "MD",
        legal_code: "TA4A",
        description: "CHANGE OF INVENTORSHIP IN PATENT"
    },
    {
        country_code: "MD",
        legal_code: "TA4K",
        description: "CHANGE OF INVENTORSHIP IN THE CERTIFICATE OF REGISTRATION"
    },
    {
        country_code: "MD",
        legal_code: "TB4A",
        description: "CORRECTION OF NAME OF PROPRIETOR"
    },
    {
        country_code: "MD",
        legal_code: "TB4K",
        description: "CORRECTION OF NAME OF PROPRIETOR"
    },
    {
        country_code: "MD",
        legal_code: "TC4A",
        description: "CHANGE OF NAME OF PROPRIETOR"
    },
    {
        country_code: "MD",
        legal_code: "TC4K",
        description: "CHANGE OF NAME OF PROPRIETOR"
    },
    {
        country_code: "MD",
        legal_code: "TH4A",
        description: "CHANGE/CORRECTION IN PATENT SPECIFICATION"
    },
    {
        country_code: "MD",
        legal_code: "TH4K",
        description: "CHANGE/CORRECTION IN SPECIFICATION"
    },
    {
        country_code: "MD",
        legal_code: "TK4A",
        description: "ERRATUM IN OFFICIAL GAZETTE IN REGARD TO PATENT"
    },
    {
        country_code: "MD",
        legal_code: "TK4K",
        description: "ERRATA IN OFFICIAL GAZETTE WITH REGARD TO CERTIFICATE OF REGISTRATION"
    },
    {
        country_code: "MD",
        legal_code: "TK4Y",
        description: "ERRATUM IN OFFICIAL GAZETTE WITH REGARD TO SHORT TERM PATENT"
    },
    {
        country_code: "NL",
        legal_code: "A1A",
        description: "A REQUEST FOR SEARCH OR AN INTERNATIONAL-TYPE SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "A1B",
        description: "A SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "A1C",
        description: "A REQUEST FOR EXAMINATION HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "A1M",
        description: "THE APPLICATION IS BASED ON A (SEVERAL) MICRO-ORGANISM(S)"
    },
    {
        country_code: "NL",
        legal_code: "A1X",
        description: "A REQUEST FOR ADDITIONAL SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "A1Y",
        description: "AN ADDITIONAL SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "A85",
        description: "STILL PENDING ON 85-01-01"
    },
    {
        country_code: "NL",
        legal_code: "AC1",
        description: "APPLICATION FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "AD1A",
        description: "A REQUEST FOR SEARCH OR AN INTERNATIONAL TYPE SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "AD1B",
        description: "A SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "AD1D",
        description: "THE DELIVERY OF A SAMPLE OF A MICRO-ORGANISM MAY BE OBTAINED FROM THE EXPERT"
    },
    {
        country_code: "NL",
        legal_code: "AD1I",
        description: "THE PATENT APPLICATION HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "ADAI",
        description: "A REQUEST FOR SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "AK",
        description: "CORRECTION OF FORMER APPLICATIONS ALREADY LAID OPEN"
    },
    {
        country_code: "NL",
        legal_code: "BA",
        description: "A REQUEST FOR SEARCH OR AN INTERNATIONAL-TYPE SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "BAI",
        description: "A REQUEST FOR SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BATV",
        description: "A REQUEST FOR SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BB",
        description: "A SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "BC",
        description: "A REQUEST FOR EXAMINATION HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "BC1",
        description: "FURTHER COMMUNICATIONS CONCERNING APPLICATIONS FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "BCI",
        description: "A REQUEST FOR EXAMINATION HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BD",
        description: "PETITION FOR RESTITUTION"
    },
    {
        country_code: "NL",
        legal_code: "BE",
        description: "FINAL DECISION FOR RESTITUTION"
    },
    {
        country_code: "NL",
        legal_code: "BF",
        description: "PETITION FOR RESTITUTION REJECTED"
    },
    {
        country_code: "NL",
        legal_code: "BI",
        description: "THE PATENT APPLICATION HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BK",
        description: "ERRATUM"
    },
    {
        country_code: "NL",
        legal_code: "BM",
        description: "THE APPLICATION IS BASED ON A (SEVERAL) MICRO-ORGANISM(S)"
    },
    {
        country_code: "NL",
        legal_code: "BN",
        description: "A DECISION NOT TO PUBLISH THE APPLICATION HAS BECOME IRREVOCABLE"
    },
    {
        country_code: "NL",
        legal_code: "BT",
        description: "A DOCUMENT HAS BEEN ADDED TO THE APPLICATION LAID OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "NL",
        legal_code: "BV",
        description: "THE PATENT APPLICATION HAS LAPSED"
    },
    {
        country_code: "NL",
        legal_code: "BX",
        description: "A REQUEST FOR ADDITIONAL SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "BXI",
        description: "A REQUEST FOR ADDITIONAL SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BXT",
        description: "A REQUEST FOR ADDITIONAL SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BXTV",
        description: "A REQUEST FOR ADDITIONAL SEARCH HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "BY",
        description: "AN ADDITIONAL SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "CD",
        description: "TRANSFER OF RIGHTS (LAID OPEN PATENT APPLICATION)"
    },
    {
        country_code: "NL",
        legal_code: "CNR",
        description: "TRANSFER OF RIGHTS (PATENT APPLICATION AFTER ITS LAYING OPENFOR PUBLIC INS PECTION)"
    },
    {
        country_code: "NL",
        legal_code: "DD",
        description: "CHANGES OF NAMES OF APPLICANTS OF LAID OPEN PATENT APPLICATIONS"
    },
    {
        country_code: "NL",
        legal_code: "DNT",
        description: "COMMUNICATIONS OF CHANGES OF NAMES OF APPLICANTS WHOSE APPLICATIONS HAVE BEEN LAID OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "NL",
        legal_code: "ED",
        description: "OTHER COMMUNICATIONS CONCERNING PATENT APPLICATIONS LAID OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "NL",
        legal_code: "EDI",
        description: "THE REGISTERED PATENT APPLICATION HAS BEEN WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "EE",
        description: "OTHER COMMUNICATIONS CONCERNING PATENT APPLICATIONS LAID OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "NL",
        legal_code: "EF",
        description: "OTHER COMMUNICATIONS CONCERNING PATENT APPLICATIONS LAID OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "NL",
        legal_code: "GD",
        description: "CORRECTIONS TO EARLIER PUBLICATIONS IN HEADING AD-ED"
    },
    {
        country_code: "NL",
        legal_code: "GRER",
        description: "PATENT GRANTED TOO EARLY"
    },
    {
        country_code: "NL",
        legal_code: "K1E",
        description: "THE PUBLIKATION OF THE EXAMINED PATENT APPLICATION IS THE FIRST PUBLICATION"
    },
    {
        country_code: "NL",
        legal_code: "KC1",
        description: "GRANT OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "NDES",
        description: "THE NETHERLANDS ARE NOT DESIGNATED"
    },
    {
        country_code: "NL",
        legal_code: "NL80",
        description: "ABBREVIATED NAME OF PATENT OWNER MENTIONED OF ALREADY NULLIFIED PATENT"
    },
    {
        country_code: "NL",
        legal_code: "NP1",
        description: "NOT AUTOMATICALLY GRANTED PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "NP1G",
        description: "NOT AUTOMATICALLY GRANTED PATENTS, BUT TEXT OF PATENT SPECIFICATION MODIFIED WITH RESPECT TO THE TEXT OF EXAMINED PATENT APPLICATION"
    },
    {
        country_code: "NL",
        legal_code: "NR80",
        description: "REFERENCE FROM MAIN PATENT TO PATENT OF ADDITION"
    },
    {
        country_code: "NL",
        legal_code: "NZ80",
        description: "PATENTS OF ADDITION ARE NOT GRANTED SINCE LAW OF 1.1.78"
    },
    {
        country_code: "NL",
        legal_code: "P1",
        description: "AUTOMATICALLY GRANTED PATENTS, EXCEPT"
    },
    {
        country_code: "NL",
        legal_code: "P2",
        description: "NOT AUTOMATICALLY GRANTED PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "P2G",
        description: "NOT AUTOMATICALLY GRANTED PATENTS, BUT TEXT OF PATENT SPECIFICATION IS MODIFIED WITH RESPECT TO THE TEXT OF EXAMINED PATENT AP"
    },
    {
        country_code: "NL",
        legal_code: "PD1A",
        description: "A REQUEST FOR SEARCH OR AN INTERNATIONAL TYPE SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "PD1B",
        description: "A SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "PD2A",
        description: "A REQUEST FOR SEARCH OR AN INTERNATIONAL TYPE SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "PD2B",
        description: "A SEARCH REPORT HAS BEEN DRAWN UP"
    },
    {
        country_code: "NL",
        legal_code: "PD2T",
        description: "A DOCUMENT HAS BEEN ADDED TO THE PATENT (APPLICATION)"
    },
    {
        country_code: "NL",
        legal_code: "PLED",
        description: "PLEDGE"
    },
    {
        country_code: "NL",
        legal_code: "PLEX",
        description: "LIFTING OF FORMER PLEDGE"
    },
    {
        country_code: "NL",
        legal_code: "R1B",
        description: "NOTICE OF OPPOSITION DURING PERIOD OF LAYING OPEN"
    },
    {
        country_code: "NL",
        legal_code: "R1I",
        description: "WITHDRAWN DURING PERIOD OF LAYING OPEN"
    },
    {
        country_code: "NL",
        legal_code: "R1V",
        description: "REQUEST FILED DURING PERIOD OF LAYING OPEN"
    },
    {
        country_code: "NL",
        legal_code: "R1VL",
        description: "PATENT APPLICATION LAID OPEN TO PUBLIC INSPECTION HAS LAPSED (E.G. NON-PAYMENT OF ANNUAL FEE)"
    },
    {
        country_code: "NL",
        legal_code: "R1VN",
        description: "REQUEST FOR MENTIONING NAME(S) OF THE INVENTOR(S) IN THE PATENT OR REQUEST FOR CHANGING THE NAME(S) OF INVENTOR(S) WITH RESPEC"
    },
    {
        country_code: "NL",
        legal_code: "R1VO",
        description: "OPPOSITION AND REQUEST FOR ASSIGNMENT OF RIGHT OF PROPERTY OR A PART OF IT TO THE OPPONENT DURING PERIOD OF LAYING OPEN"
    },
    {
        country_code: "NL",
        legal_code: "R1VV",
        description: "REQUEST CONCERNING THE RIGHT OF PRIOR USE (OF A PERSON HAVING APPLIED THE INVENTION ALREADY BEFORE APPLICATION DAY)"
    },
    {
        country_code: "NL",
        legal_code: "R2B",
        description: "WITHDRAWN AFTER OPPOSITION"
    },
    {
        country_code: "NL",
        legal_code: "R2C",
        description: "REFUSED AFTER OPPOSITION"
    },
    {
        country_code: "NL",
        legal_code: "R2I",
        description: "WITHDRAWN AFTER PUBLICATION"
    },
    {
        country_code: "NL",
        legal_code: "R2K",
        description: "REFUSED AFTER PUBLICATION DUE TO PRIOR USE"
    },
    {
        country_code: "NL",
        legal_code: "R2V",
        description: "LAPSED AFTER PUBLICATION"
    },
    {
        country_code: "NL",
        legal_code: "R2W",
        description: "REFUSED AFTER PUBLICATION"
    },
    {
        country_code: "NL",
        legal_code: "RD1A",
        description: "PATENTS IN RESPECT OF WHICH A REQUEST FOR ADVICE HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "RD1B",
        description: "PATENTS IN RESPECT OF WHICH A REQUEST AND/OR A NOTICE OF APPEAL HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "RD1H",
        description: "A REQUEST FOR RESTORATION TO THE PRIOR STATE HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "RD1N",
        description: "PATENTS IN RESPECT OF WHICH A REQUEST FOR NOVELTY SEARCH HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "RD1V",
        description: "PATENTS IN RESPECT OF WHICH A REQUEST FOR EXAMINATION HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "RD2A",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (FOR ADVICE)"
    },
    {
        country_code: "NL",
        legal_code: "RD2E",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (OPPOSITION REASONED, NOVELTY REPORT ACKNOWLED"
    },
    {
        country_code: "NL",
        legal_code: "RD2H",
        description: "REQUEST FOR RESTORATION REASONED, PATENT MAINTAINED"
    },
    {
        country_code: "NL",
        legal_code: "RD2I",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (WITHDRAWAL)"
    },
    {
        country_code: "NL",
        legal_code: "RD2N",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (NOVELTY REPORT)"
    },
    {
        country_code: "NL",
        legal_code: "RD2O",
        description: "PATENTS IN RESPECT OF WHICH A NOTICE OF OPPOSITION UNDER THE GENERAL ADMINISTRATIVE LAW IS REASONED (PATENT GRANTED)"
    },
    {
        country_code: "NL",
        legal_code: "RD2P",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (OPPOSITION ACCORD. GENERAL ADMINSTRATIVE LAW WITHDRAWN)"
    },
    {
        country_code: "NL",
        legal_code: "RD2U",
        description: "PATENTS IN RESPECT OF WHICH AN OPPOSITION IS UNREASONED"
    },
    {
        country_code: "NL",
        legal_code: "RD2W",
        description: "PATENTS IN RESPECT OF WHICH A DECISION HAS BEEN TAKEN OR A REPORT HAS BEEN MADE (PATENT REFUSED)"
    },
    {
        country_code: "NL",
        legal_code: "RDX",
        description: "APPEAL AGAINST THE REASTABLISHMENT OF RIGHTS"
    },
    {
        country_code: "NL",
        legal_code: "RI",
        description: "PATENT APPLICATION HAS BEEN WITHDRAWN AFTER PUBLICATION (E.G. DUE TO AN OPPOSITION)"
    },
    {
        country_code: "NL",
        legal_code: "RV",
        description: "PATENT APPLICATION HAS LAPSED AFTER PUBLICATION (E.G. DUE TO NON-PAYMENT OF ANNUAL FEE)"
    },
    {
        country_code: "NL",
        legal_code: "RW",
        description: "REJECTED PATENT APPLICATION AFTER PUBLICATION (IN OPPOSITION- OR APPEAL PROCEEDINGS)"
    },
    {
        country_code: "NL",
        legal_code: "SC",
        description: "COMMUNICATIONS OF ASSIGNMENTS CONCERNING GRANTED SUPPLEMENTARY PROTECTION CERTIFICATES"
    },
    {
        country_code: "NL",
        legal_code: "SD",
        description: "ASSIGNMENTS OF PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "SEIC",
        description: "CONFISCATION CANCELLED"
    },
    {
        country_code: "NL",
        legal_code: "SEIZ",
        description: "CONFISCATION"
    },
    {
        country_code: "NL",
        legal_code: "SNR",
        description: "ASSIGNMENTS OF PATENTS OR RIGHTS ARISING FROM EXAMINED PATENT APPLICATIONS"
    },
    {
        country_code: "NL",
        legal_code: "SPCC",
        description: "REGISTERD LICENCE OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCE",
        description: "FILING FOR AN EXTENSION FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCI",
        description: "REINSATEMENT OF AN SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCO",
        description: "OBJECTION AWB (FOR AN SUPPLEMENTARY PROTECTION CERTIFICTE)"
    },
    {
        country_code: "NL",
        legal_code: "SPCQ",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE LAPSED AS THE BASIC PATENT GOT INVALID BEFORE EXPIRY DATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCR",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATE REVOKED"
    },
    {
        country_code: "NL",
        legal_code: "SPCT",
        description: "CHANGE OF OWNERSHIP OR CHANGE OF NAME OF THE OWNER OF AN SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCW",
        description: "WITHDRAWAL OF A SUPPLEMENTARY PROTECTION CERTIFICATE (ART. 63)"
    },
    {
        country_code: "NL",
        legal_code: "SPCX",
        description: "EXPIRY OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "SPCZ",
        description: "GRANT OF EXTENSION OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NL",
        legal_code: "T3",
        description: "TRANSLATION FILES FOR AN EUROPEAN PATENT GRANTED FOR NL, CONFIRMING ART. 52 PAR. 1 OR 6 OF THE PATENTS ACT 1995"
    },
    {
        country_code: "NL",
        legal_code: "TC",
        description: "COMMUNICATIONS OF MODIFICATIONS OF NAMES OF PROPRIETORS OF GRANTED SUPPLEMENTARY PROTECTION CERTIFICATES"
    },
    {
        country_code: "NL",
        legal_code: "TD",
        description: "MODIFICATIONS OF NAMES OF PROPRIETORS OF PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "TNT",
        description: "MODIFICATIONS OF NAMES OF PROPRIETORS OF PATENTS OR APPLICANTS OF EXAMINED PATENT APPLICATIONS"
    },
    {
        country_code: "NL",
        legal_code: "U",
        description: "LICENCES REGISTERED WITH REGARD TO PATENTS GRANTED"
    },
    {
        country_code: "NL",
        legal_code: "UD",
        description: "REGISTRATION OF LICENCES WITH REGARD TO PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "UDE",
        description: "LICENSE AGREEMENT ENDED"
    },
    {
        country_code: "NL",
        legal_code: "V1",
        description: "LAPSED BECAUSE OF NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "NL",
        legal_code: "V2",
        description: "LAPSED DUE TO NON-PAYMENT OF THE LAST DUE MAINTENANCE FEE FOR THE PATENT APPLICATION"
    },
    {
        country_code: "NL",
        legal_code: "V3",
        description: "ADDITIONAL PATENTS LAPSED AT THE SAME TIME AS THE MAIN PATENT"
    },
    {
        country_code: "NL",
        legal_code: "V4",
        description: "LAPSED BECAUSE OF REACHING THE MAXIM LIFETIME OF A PATENT"
    },
    {
        country_code: "NL",
        legal_code: "V5",
        description: "ANNULMENT (ART. 51)"
    },
    {
        country_code: "NL",
        legal_code: "V6",
        description: "PATENT SURRENDERED (ART. 48)"
    },
    {
        country_code: "NL",
        legal_code: "V6P",
        description: "PARTIAL SURRENDER OF PATENT"
    },
    {
        country_code: "NL",
        legal_code: "VAF",
        description: "LAPSED BECAUSE OF REACHING THE MAXIM LIFETIME OF A PATENT"
    },
    {
        country_code: "NL",
        legal_code: "VAFA",
        description: "LAPSED BECAUSE OF REACHING THE MAXIM LIFETIME OF A PATENT (ADDITIONAL PATENT LAPSED AT THE SAME TIME AS THE MAIN PATENT)"
    },
    {
        country_code: "NL",
        legal_code: "VC1",
        description: "SUPPLEMENTARY PROTECTION CERTIFICATES LAPSED OR EXPIRED"
    },
    {
        country_code: "NL",
        legal_code: "VD1",
        description: "LAPSED DUE TO NON-PAYMENT OF THE ANNUAL FEE"
    },
    {
        country_code: "NL",
        legal_code: "VD2",
        description: "LAPSED DUE TO EXPIRATION OF THE TERM OF PROTECTION"
    },
    {
        country_code: "NL",
        legal_code: "VD3",
        description: "ANNULMENT"
    },
    {
        country_code: "NL",
        legal_code: "VD4",
        description: "LAPSED DUE TO RESIGNATION BY THE PROPRIETOR"
    },
    {
        country_code: "NL",
        legal_code: "VDEP",
        description: "INVALID IN THE NETHERLANDS AS NO TRANSLATION HAS BEEN FILED"
    },
    {
        country_code: "NL",
        legal_code: "VIT",
        description: "LAPSED DUE TO NON-PAYMENT OF THE DUE MAINTENANCE FEE FOR THE PATENT OR PATENT APPLICATION"
    },
    {
        country_code: "NL",
        legal_code: "VITA",
        description: "LAPSED DUE TO NON-PAYMENT OF THE DUE MAINTENANCE FEE (ADDITIONAL PATENT LAPSED TOGETHER WITH THE BASIC PATENT)"
    },
    {
        country_code: "NL",
        legal_code: "VJC",
        description: "LAPSED DUE TO NON-PAYMENT OF THE DUE MAINTENANCE FEE FOR THE PATENT OR PATENT APPLICATION"
    },
    {
        country_code: "NL",
        legal_code: "VJCA",
        description: "LAPSED DUE TO NON-PAYMENT OF THE DUE MAINTENANCE FEE (ADDITIONAL PATENT LAPSED TOGETHER WITH THE BASIC PATENT)"
    },
    {
        country_code: "NL",
        legal_code: "VVCA",
        description: "ADDITIONAL PATENT LAPSED BECAUSE OF NON-PAYMENT OF THE PUBLICATION FEE"
    },
    {
        country_code: "NL",
        legal_code: "WDAP",
        description: "PATENT APPLICATION WITHDRAWN"
    },
    {
        country_code: "NL",
        legal_code: "X",
        description: "DOCUMENT NOT PUBLISHED DUE TO A DIRECTIVE OF THE MINISTER OF DEFENCE"
    },
    {
        country_code: "NL",
        legal_code: "XC",
        description: "OTHER COMMUNICATIONS CONCERNING SUPPLEMENTARY PROTECTION CERTIFICATES"
    },
    {
        country_code: "NL",
        legal_code: "XD",
        description: "OTHER COMMUNICATIONS CONCERNING PATENTS"
    },
    {
        country_code: "NL",
        legal_code: "XEP",
        description: "THE NETHERLANDS ARE NOT DESIGNATED"
    },
    {
        country_code: "NL",
        legal_code: "XXA",
        description: "MISCELLANEOUS"
    },
    {
        country_code: "NL",
        legal_code: "XXP",
        description: "MISCELLANEOUS"
    },
    {
        country_code: "NL",
        legal_code: "ZC",
        description: "CORRECTIONS CONCERNING GRANTED SUPPLEMENTARY PROTECTION CERTIFICATES"
    },
    {
        country_code: "NL",
        legal_code: "ZD",
        description: "CORRECTIONS TO EARLIER PUBLICATIONS"
    },
    {
        country_code: "NO",
        legal_code: "AVGR",
        description: "SECRET PATENT BECOMES GENERALLY AVAILABLE"
    },
    {
        country_code: "NO",
        legal_code: "BDEC",
        description: "BOARD OF APPEAL DECISION"
    },
    {
        country_code: "NO",
        legal_code: "C",
        description: "PUBLISHED PATENT BEFORE BOARD OF APPEAL - C (PAR. 26 PATENTS ACT)"
    },
    {
        country_code: "NO",
        legal_code: "CB",
        description: "OPPOSITION FILED (PAR. 26,5 PATENTS ACT)"
    },
    {
        country_code: "NO",
        legal_code: "CDEC",
        description: "COURT DECISION"
    },
    {
        country_code: "NO",
        legal_code: "CHAD",
        description: "CHANGE OF THE OWNER'S NAME OR ADDRESS (PAR. 44 PATENT LAW; PAR. PATENTFORSKRIFTEN)"
    },
    {
        country_code: "NO",
        legal_code: "CREP",
        description: "CHANGE OF REPRESENTATIVE"
    },
    {
        country_code: "NO",
        legal_code: "D25",
        description: "CHANGE ACCORDING TO B1 PUBLICATION AFTER OPPOSITION (PAR. 25 PATENTS ACT)"
    },
    {
        country_code: "NO",
        legal_code: "EPNV",
        description: "EUROPEAN PATENT NOT VALIDATED IN NORWAY"
    },
    {
        country_code: "NO",
        legal_code: "EREP",
        description: "POWER OF ATTORNEY DISCONTINUED"
    },
    {
        country_code: "NO",
        legal_code: "ERR",
        description: "ERRATUM"
    },
    {
        country_code: "NO",
        legal_code: "FC2A",
        description: "REJECTION OF LAID OPEN PATENT APPLICATION"
    },
    {
        country_code: "NO",
        legal_code: "LC4",
        description: "LIMITATION OF PATENT RIGHTS - B3 (PAR. 39B PATENT ACT)"
    },
    {
        country_code: "NO",
        legal_code: "LIS",
        description: "PUBLISHED LICENSE"
    },
    {
        country_code: "NO",
        legal_code: "LISA",
        description: "TRANSFER OF LICENSE"
    },
    {
        country_code: "NO",
        legal_code: "MC2A",
        description: "PATENT WITHDRAWN"
    },
    {
        country_code: "NO",
        legal_code: "MH4A",
        description: "RENUNCIATION"
    },
    {
        country_code: "NO",
        legal_code: "MINV",
        description: "INVALIDATION BY COURT DECISION"
    },
    {
        country_code: "NO",
        legal_code: "MK1K",
        description: "EXPIRY"
    },
    {
        country_code: "NO",
        legal_code: "MM1K",
        description: "LAPSED BY NOT PAYING THE ANNUAL FEES"
    },
    {
        country_code: "NO",
        legal_code: "MMEP",
        description: "LAPSED, NULLIFIED, VOID OR EXPIRED EUROPEAN PATENT THAT HAD EFFECT IN NORWAY"
    },
    {
        country_code: "NO",
        legal_code: "PDF",
        description: "FILING AN OPPOSITION"
    },
    {
        country_code: "NO",
        legal_code: "PDP",
        description: "DECISION OF OPPOSITION (PAR. 25 PATENT ACT)"
    },
    {
        country_code: "NO",
        legal_code: "PLED",
        description: "PLEDGE"
    },
    {
        country_code: "NO",
        legal_code: "RE",
        description: "REESTABLISHMENT OF RIGHTS (PAR. 72 PATENTS ACT)"
    },
    {
        country_code: "NO",
        legal_code: "REER",
        description: "REQUEST FOR ADMINISTRATIVE REEVALUATION OF PATENT"
    },
    {
        country_code: "NO",
        legal_code: "RETC",
        description: "RETURNED AFTER APPEAL/COURT DECISION"
    },
    {
        country_code: "NO",
        legal_code: "SPCA",
        description: "APPEAL FILED TO THE COURT AFTER REJECTION OF AN SPC"
    },
    {
        country_code: "NO",
        legal_code: "SPCF",
        description: "FILING OF SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NO",
        legal_code: "SPCG",
        description: "GRANTED SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NO",
        legal_code: "SPCR",
        description: "REINSTATEMENT OF AN SPC"
    },
    {
        country_code: "NO",
        legal_code: "SPCS",
        description: "CHANGE OF NAME OR ADDRESS OF THE OWNER OF AN SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NO",
        legal_code: "SPCW",
        description: "REJECTION OR LAPSE OF SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "NO",
        legal_code: "SPCX",
        description: "EXPIRY OF AN SPC"
    },
    {
        country_code: "NO",
        legal_code: "T1",
        description: "EUROPEAN APPLICATION VALID IN NORWAY"
    },
    {
        country_code: "NO",
        legal_code: "T2",
        description: "ENTRY OF EP PATENT INTO NATIONAL PHASE OF NORWAY"
    },
    {
        country_code: "NO",
        legal_code: "TC",
        description: "TRANSLATION OF CLAIMS IN EUROPEAN APPLICATION (A1/A2)"
    },
    {
        country_code: "NO",
        legal_code: "TREP",
        description: "POWER OF ATTORNEY DISCONTINUED"
    },
    {
        country_code: "New",
        legal_code: "Zealand",
        description: ""
    },
    {
        country_code: "NZ",
        legal_code: "AABA",
        description: "APPLICATION ABANDONED"
    },
    {
        country_code: "NZ",
        legal_code: "AMND",
        description: "ORDER GRANTING LEAVE TO AMEND"
    },
    {
        country_code: "NZ",
        legal_code: "ASS",
        description: "CHANGE OF OWNERSHIP"
    },
    {
        country_code: "NZ",
        legal_code: "AVOD",
        description: "APPLICATION VOID"
    },
    {
        country_code: "NZ",
        legal_code: "CFIR",
        description: "CANCELLATION OF FINANCIAL INTEREST IN THE REGISTER"
    },
    {
        country_code: "NZ",
        legal_code: "CORR",
        description: "CORRIGENDUM"
    },
    {
        country_code: "NZ",
        legal_code: "EXPY",
        description: "PATENT EXPIRED"
    },
    {
        country_code: "NZ",
        legal_code: "LCAP",
        description: "APPLICATION FOR ENTRY OF NOTICE OF LICENCE IN THE REGISTER OF PATENTS"
    },
    {
        country_code: "NZ",
        legal_code: "LCEA",
        description: "LICENSEES ADDED"
    },
    {
        country_code: "NZ",
        legal_code: "LENP",
        description: "PCT: LATE ENTRY INTO NATIONAL PHASE GRANTED"
    },
    {
        country_code: "NZ",
        legal_code: "PSEA",
        description: "PATENT SEALED"
    },
    {
        country_code: "NZ",
        legal_code: "RADV",
        description: "READVERTISED FROM PREVIOUS JOURNALS"
    },
    {
        country_code: "NZ",
        legal_code: "RENP",
        description: "PCT: LATE ENTRY INTO NATIONAL PHASE REQUESTED"
    },
    {
        country_code: "NZ",
        legal_code: "RENW",
        description: "RENEWAL (RENEWAL FEES ACCEPTED)"
    },
    {
        country_code: "NZ",
        legal_code: "S123",
        description: "POST-DATING OF PATENT APPLICATION ACCORDING SECTION 12(3) PATENTS ACT 1953"
    },
    {
        country_code: "NZ",
        legal_code: "S18",
        description: "SUPPLEMENTARY PROVISIONS AS TO EXAMINATION, ETC. ACCORDING SECTION 18, PATENTS ACT 1953"
    },
    {
        country_code: "NZ",
        legal_code: "S22A",
        description: "AMENDMENT AFTER REFUSAL WITHOUT OPPOSISITON ACC. SECT. 22"
    },
    {
        country_code: "NZ",
        legal_code: "S23",
        description: "PROCEEDINGS UNDER SECTION 23: MENTION OF INVENTOR AS SUCH IN PATENT"
    },
    {
        country_code: "NZ",
        legal_code: "S245",
        description: "PROCEEDING ACCORDING SECTION 24(5): DISPUTE BETWEEN JOINT APPLICANTS, WHETHER OR IN WHAT MANNER THE APPLICATION SHOULD BE PROCEEDED WITH"
    },
    {
        country_code: "NZ",
        legal_code: "S35A",
        description: "APPLICATION FOR PROCEEDINGS UNDER SECTION 35 (RESTORATION OF LAPSED PATENTS)"
    },
    {
        country_code: "NZ",
        legal_code: "S35R",
        description: "PROCEEDINGS UNDER SECTION 35 (RESTORATION OF LAPSED PATENTS): PATENT RESTORED"
    },
    {
        country_code: "NZ",
        legal_code: "S36A",
        description: "APPLICATION FOR PROCEDDINGS UNDER SECTION 36 (RESTORATION OF APPLICATIONS WHERE PATENT NOT SEALED)"
    },
    {
        country_code: "NZ",
        legal_code: "S36R",
        description: "PROCEEDINGS UNDER SECTION 36 (RESTORATION OF APPLICATIONS WHERE PATENT NOT SEALED): APPLICATION RESTORED"
    },
    {
        country_code: "NZ",
        legal_code: "S37A",
        description: "APPLICATION FOR PROCEEDINGS UNDER SECTION 37 (RESTORATION OF APPLICATION WHERE COMPLETE SPECIFICATION NOT ACCEPTED)"
    },
    {
        country_code: "NZ",
        legal_code: "S37N",
        description: "PROCEEDINGS UNDER SECTION 37 (RESTORATION OF APPLICATION WHERE COMPLETE SPECIFICATION NOT ACCEPTED): APPLICATION NOT RESTORED"
    },
    {
        country_code: "NZ",
        legal_code: "S37R",
        description: "PROCEEDINGS UNDER SECTION 37 (RESTORATION OF APPLICATION WHERE COMPLETE SPECIFICATION NOT ACCEPTED): APPLICATION RESTORED"
    },
    {
        country_code: "NZ",
        legal_code: "S38A",
        description: "APPLICATION FOR PROCEEDINGS UNDER SECTION 38 (AMENDMENT OF SPECIFICATION WITH LEAVE OF COMMISSIONER)"
    },
    {
        country_code: "NZ",
        legal_code: "S38C",
        description: "PROCEEDINGS UNDER SECTION 38 (AMENDMENT OF SPECIFICATION WITH LEAVE OF COMMISSIONER): SPECIFICATION AMENDED"
    },
    {
        country_code: "NZ",
        legal_code: "S39A",
        description: "APPLICATION FOR PRECEEDINGS UNDER SECTION 39 (AMENDMENT OF SPECIFICATION WITH LEAVE OF COURT)"
    },
    {
        country_code: "NZ",
        legal_code: "S39O",
        description: "PROCEEDING UNDER SECTION 39 (AMENDMENT OF SPECIFICATION WITH LEAVE OF COURT): SPECIFICATION AMENDED BY COURT ORDER"
    },
    {
        country_code: "NZ",
        legal_code: "S39V",
        description: "PROCEEDING UNDER SECTION 39 (PATENTS ACT 1953): AMENDMENT OF SPECIFICATION WITH LEAVE OF COURT, BY LEAVE OF AN AGREEMENT"
    },
    {
        country_code: "NZ",
        legal_code: "S42R",
        description: "PATENT REVOKED UNDER SECTION 42"
    },
    {
        country_code: "NZ",
        legal_code: "S43",
        description: "SURRENDER OF PATENTS ACCORDING SECTION 43 PATENTS ACT"
    },
    {
        country_code: "NZ",
        legal_code: "S43R",
        description: "PATENT REVOKED UNDER SECTION 42"
    },
    {
        country_code: "NZ",
        legal_code: "S88",
        description: "CORRECTION OF ERROR (ACCORDING SECT. 88 PATENTS ACT)"
    },
    {
        country_code: "NZ",
        legal_code: "S881",
        description: "CORRECTION OF ERROR ACCORDING SECTION 88(1) (MISTAKE IN REGISTER BY REASON OF AN ERROR OR OMISSION ON THE PART OF THE PATENT OFFICE)"
    },
    {
        country_code: "NZ",
        legal_code: "S882",
        description: "CORRECTION OF ERROR ACCORDING TO SECTION 88(2) (PROPOSED BY COMMISSIONER)"
    },
    {
        country_code: "NZ",
        legal_code: "S883",
        description: "CORRECTION OF ERROR ACCORDING TO SECTION 88(3) (MISTAKE IN REGISTER CAUSED ON PART OF PATENTEE OR APPLICANT)"
    },
    {
        country_code: "NZ",
        legal_code: "S88O",
        description: "CORRECTION OF ERROR IN REGISTER ACCORDING SECTION 88 (BASED ON OPPOSITION)"
    },
    {
        country_code: "NZ",
        legal_code: "S93A",
        description: "EXTENSION OF TIME LIMITS FOR FILING CONVENTION APPLICATION OR COMPLETE SPECIFICATION (SECTION 93A)"
    },
    {
        country_code: "PE",
        legal_code: "FA",
        description: "ABANDONMENT OR WITHDRAWAL"
    },
    {
        country_code: "PE",
        legal_code: "FC",
        description: "REFUSAL"
    },
    {
        country_code: "PE",
        legal_code: "FD",
        description: "APPLICATION DECLARED VOID OR LAPSED"
    },
    {
        country_code: "PE",
        legal_code: "FG",
        description: "GRANT, REGISTRATION"
    },
    {
        country_code: "PE",
        legal_code: "FX",
        description: "VOLUNTARY WITHDRAWAL"
    },
    {
        country_code: "PH",
        legal_code: "AT",
        description: "RECORD OF ANNUAL FEE PAIEMENTS"
    },
    {
        country_code: "PL",
        legal_code: "DISC",
        description: "DECISIONS ON DISCONTINUANCE OF THE PROCEEDINGS (TAKEN AFTER THE PUBLICATION OF THE PARTICULARS OF THE APPLICATIONS)"
    },
    {
        country_code: "PL",
        legal_code: "DISD",
        description: "DECISIONS ON DISCONTINUANCE OF THE PROCEEDINGS OF A DERIVED PATENT OR UTILITY MODEL"
    },
    {
        country_code: "PL",
        legal_code: "DISU",
        description: "DECISIONS ON DISCONTINUANCE OF THE PROCEEDINGS (TAKEN AFTER THE PUBLICATION OF THE PARTICULARS OF THE APPLICATIONS)"
    },
    {
        country_code: "PL",
        legal_code: "INVP",
        description: "DECISIONS ON INVALIDATION OF PATENTS"
    },
    {
        country_code: "PL",
        legal_code: "LAPE",
        description: "DECISIONS ON THE LAPSE OF THE EUROPEAN PATENT IN THE TERRITORY OF THE REPUBLIC OF POLAND"
    },
    {
        country_code: "PL",
        legal_code: "LAPS",
        description: "DECISIONS ON THE LAPSE OF THE PROTECTION RIGHTS"
    },
    {
        country_code: "PL",
        legal_code: "LAPU",
        description: "DECISIONS ON THE LAPSE OF RIGHTS OF PROTECTION OF UTILITY MODEL"
    },
    {
        country_code: "PL",
        legal_code: "LICE",
        description: "DECLARATIONS OF WILLINGNESS TO GRANT LICENCE"
    },
    {
        country_code: "PL",
        legal_code: "RECP",
        description: "RECTIFICATIONS OF PATENT SPECIFICATION"
    },
    {
        country_code: "PL",
        legal_code: "RECU",
        description: "RECTIFICATIONS OF UTILITY MODEL SPECIFICATION"
    },
    {
        country_code: "PL",
        legal_code: "REFD",
        description: "DECISIONS ON REFUSAL TO GRANT DERIVATED PATENT OR UTILITY MODEL"
    },
    {
        country_code: "PL",
        legal_code: "REFS",
        description: "DECISIONS ON REFUSAL TO GRANT PATENTS (TAKEN AFTER THE PUBLICATION OF THE PARTICULARS OF THE APPLICATIONS)"
    },
    {
        country_code: "PL",
        legal_code: "REFU",
        description: "DECISIONS ON REFUSAL TO GRANT RIGHTS OF PROTECTION (TAKE AFTER THE PUBLICATION OF THE PARTICULARS OF THE APPLICATION)"
    },
    {
        country_code: "PL",
        legal_code: "SPCF",
        description: "APPLICATION FOR A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "PL",
        legal_code: "T3",
        description: "TRANSLATION OF EP PATENT"
    },
    {
        country_code: "PL",
        legal_code: "T4",
        description: "TRANSLATION OF AMENDED EP PATENT"
    },
    {
        country_code: "PL",
        legal_code: "T5",
        description: "TRANSLATION OF MODIFIED EP PATENT"
    },
    {
        country_code: "PL",
        legal_code: "T6",
        description: "TRANSLATION OF EP PATENT LIMITED BY THE PROPRIETOR (EPC ART. 105 (A))"
    },
    {
        country_code: "PL",
        legal_code: "VDSO",
        description: "INVALIDATION OF DERIVATED PATENT OR UTILITY MODEL"
    },
    {
        country_code: "PL",
        legal_code: "VOID",
        description: "DECISIONS DECLARING THE DECISIONS ON THE GRANT OF THE PATENTS LAPSED"
    },
    {
        country_code: "PL",
        legal_code: "VOIU",
        description: "DECISIONS DECLARING THE DECISIONS ON THE GRANT OF THE RIGHTS OF PROTECTION LAPSED"
    },
    {
        country_code: "PT",
        legal_code: "BB1A",
        description: "LAYING OPEN OF PATENT APPLICATION"
    },
    {
        country_code: "PT",
        legal_code: "BB1B",
        description: "APPLICATION OPEN TO PUBLIC INSPECTION"
    },
    {
        country_code: "PT",
        legal_code: "BB1K",
        description: "LAYING OPEN OF UTILITY MODEL APPLICATION"
    },
    {
        country_code: "PT",
        legal_code: "BB1Z",
        description: "NEW AUTHORIZED PUBLICATION OF LAYING OPEN PATENT APPLICATION"
    },
    {
        country_code: "PT",
        legal_code: "CB1A",
        description: "OPPOSITION TO GRANT"
    },
    {
        country_code: "PT",
        legal_code: "FA1A",
        description: "WITHDRAWAL OF APPLICATION (PATENT)"
    },
    {
        country_code: "PT",
        legal_code: "FA1K",
        description: "WITHDRAWAL OF APPLICATION (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "FC3A",
        description: "REFUSAL"
    },
    {
        country_code: "PT",
        legal_code: "FC3K",
        description: "REFUSAL (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "FC4A",
        description: "REFUSAL"
    },
    {
        country_code: "PT",
        legal_code: "FG3A",
        description: "PATENT GRANTED, DATE OF GRANTING"
    },
    {
        country_code: "PT",
        legal_code: "FG3B",
        description: "PATENT OF ADDITION GRANTED, DATE OF GRANTING"
    },
    {
        country_code: "PT",
        legal_code: "FG3K",
        description: "UTILITY MODEL GRANTED, DATE OF GRANTING"
    },
    {
        country_code: "PT",
        legal_code: "FG4A",
        description: "PATENT GRANTED, DATE OF GRANTING (FROM PCT APPLICATION)"
    },
    {
        country_code: "PT",
        legal_code: "FG4K",
        description: "UTILITY MODEL GRANTED, DATE OF GRANTING (FROM PCT APPLICATION)"
    },
    {
        country_code: "PT",
        legal_code: "GA1A",
        description: "CONVERTED TO UTILITY MODEL"
    },
    {
        country_code: "PT",
        legal_code: "GA1K",
        description: "CONVERTED TO PATENT"
    },
    {
        country_code: "PT",
        legal_code: "HH1A",
        description: "CORRECTION"
    },
    {
        country_code: "PT",
        legal_code: "MA3A",
        description: "WITHDRAWAL OF PATENT"
    },
    {
        country_code: "PT",
        legal_code: "MA3K",
        description: "WITHDRAWAL OF UTILITY MODEL"
    },
    {
        country_code: "PT",
        legal_code: "MA4A",
        description: "WITHDRAWAL OF EUROPEAN PATENT"
    },
    {
        country_code: "PT",
        legal_code: "MF4A",
        description: "REVOCATION OF NATIONAL PROTECTION"
    },
    {
        country_code: "PT",
        legal_code: "MM1K",
        description: "ANNULMENT OR LAPSE OR UTILITY MODEL APPLICATION"
    },
    {
        country_code: "PT",
        legal_code: "MM3A",
        description: "ANNULMENT OR LAPSE"
    },
    {
        country_code: "PT",
        legal_code: "MM3K",
        description: "ANNULMENT OR LAPSE (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "MM4A",
        description: "ANNULMENT/LAPSE DUE TO NON-PAYMENT OF FEES;SEARCHED & EXAMINED PATENT"
    },
    {
        country_code: "PT",
        legal_code: "MM4K",
        description: "ANNULMENT OR LAPSE (GRANTED UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "MP4A",
        description: "REFUSAL OF NATIONAL PROTECTION"
    },
    {
        country_code: "PT",
        legal_code: "NF3A",
        description: "RESTITUTIO IN INTEGRUM"
    },
    {
        country_code: "PT",
        legal_code: "NF3K",
        description: "RESTITUTIO IN INTEGRUM OF UTILITY MODEL"
    },
    {
        country_code: "PT",
        legal_code: "NF4A",
        description: "RESTITUTIO IN INTEGRUM"
    },
    {
        country_code: "PT",
        legal_code: "NF4K",
        description: "RESTITUTIO IN INTEGRUM OF UTILITY MODEL"
    },
    {
        country_code: "PT",
        legal_code: "PC1A",
        description: "TRANSFER OR ASSIGNMENT"
    },
    {
        country_code: "PT",
        legal_code: "PC3A",
        description: "TRANSFER OR ASSIGNMENT"
    },
    {
        country_code: "PT",
        legal_code: "PC3K",
        description: "TRANSFER"
    },
    {
        country_code: "PT",
        legal_code: "PC4A",
        description: "TRANSFER OF ASSIGNMENT"
    },
    {
        country_code: "PT",
        legal_code: "PC4K",
        description: "TRANSFER OF ASSIGNMENT (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "PD3A",
        description: "CHANGE OF PROPRIETORSHIP"
    },
    {
        country_code: "PT",
        legal_code: "PD3K",
        description: "CHANGE OF PROPRIETORSHIP"
    },
    {
        country_code: "PT",
        legal_code: "PD4A",
        description: "CHANGE OF PROPRIETORSHIP"
    },
    {
        country_code: "PT",
        legal_code: "PD4K",
        description: "CHANGE OF PROPRIETORSHIP (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "PT92",
        description: "PATENT VALID ON 920101, DATE OF GRANTING"
    },
    {
        country_code: "PT",
        legal_code: "QB3A",
        description: "LICENCE"
    },
    {
        country_code: "PT",
        legal_code: "QB4A",
        description: "LICENCE"
    },
    {
        country_code: "PT",
        legal_code: "QB4K",
        description: "LICENCE OF UTILITY MODEL"
    },
    {
        country_code: "PT",
        legal_code: "RL3A",
        description: "GRANT FOLLOWING COURT DECISION"
    },
    {
        country_code: "PT",
        legal_code: "SC4A",
        description: "TRANSLATION IS AVAILABLE"
    },
    {
        country_code: "PT",
        legal_code: "TE1K",
        description: "CHANGE OF ADDRESS (UTILITY MODEL APPLICATION)"
    },
    {
        country_code: "PT",
        legal_code: "TE3A",
        description: "CHANGE OF ADDRESS (PATENT)"
    },
    {
        country_code: "PT",
        legal_code: "TE3K",
        description: "CHANGE OF ADDRESS (UTILITY MODEL)"
    },
    {
        country_code: "PT",
        legal_code: "TE4A",
        description: "CHANGE OF ADDRESS (PATENT)"
    },
    {
        country_code: "PT",
        legal_code: "TE4K",
        description: "CHANGE OF ADDRESS (UTILITY MODEL)"
    },
    {
        country_code: "RO",
        legal_code: "EPE",
        description: "EP PATENT VALID IN ROMANIA"
    },
    {
        country_code: "RU",
        legal_code: "BF1K",
        description: "CANCELLING A PUBLICATION OF EARLIER DATE"
    },
    {
        country_code: "RU",
        legal_code: "BF4A",
        description: "CANCELLING A PUBLICATION OF EARLIER DATE"
    },
    {
        country_code: "RU",
        legal_code: "FA91",
        description: "APPLICATION WITHDRAWN (ON APPLICANT'S REQUEST)"
    },
    {
        country_code: "RU",
        legal_code: "FA92",
        description: "ACKNOWLEDGEMENT OF APPLICATION WITHDRAWN (LACK OF SUPPLEMENTARY MATERIALS SUBMITTED)"
    },
    {
        country_code: "RU",
        legal_code: "FA93",
        description: "ACKNOWLEDGEMENT OF APPLICATION WITHDRAWN (NO REQUEST FOR EXAMINATION)"
    },
    {
        country_code: "RU",
        legal_code: "FA94",
        description: "ACKNOWLEDGEMENT OF APPLICATION WITHDRAWN (NON-PAYMENT OF FEES)"
    },
    {
        country_code: "RU",
        legal_code: "FA95",
        description: "ACKNOWLEDGEMENT OF APPLICATION WITHDRAWN DUE TO THE LATER FILING OF THE SAME APPLICATION (JUNIOR APPLICATION)"
    },
    {
        country_code: "RU",
        legal_code: "FA9A",
        description: "APPLICATION WITHDRAWN (ON APPLICANT'S REQUEST)"
    },
    {
        country_code: "RU",
        legal_code: "FZ9A",
        description: "APPLICATION NOT WITHDRAWN (CORRECTION OF THE NOTICE OF WITHDRAWAL)"
    },
    {
        country_code: "RU",
        legal_code: "GA9A",
        description: "CONVERSION OF A PATENT APPLICATION INTO A UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "HE1K",
        description: "NOTICE OF CHANGE OF ADDRESS OF A UTILITY MODEL OWNER"
    },
    {
        country_code: "RU",
        legal_code: "HE4A",
        description: "NOTICE OF CHANGE OF ADDRESS OF A PATENT OWNER"
    },
    {
        country_code: "RU",
        legal_code: "HE9A",
        description: "CHANGING ADDRESS FOR CORRESPONDENCE WITH AN APPLICANT"
    },
    {
        country_code: "RU",
        legal_code: "HK1K",
        description: "CHANGES IN A UTILITY MODEL PUBLICATION"
    },
    {
        country_code: "RU",
        legal_code: "HK4A",
        description: "CHANGES IN A PUBLISHED INVENTION"
    },
    {
        country_code: "RU",
        legal_code: "MF11",
        description: "CANCELLING A UTILITY MODEL PATENT (TOTAL INVALIDATION THEREOF)"
    },
    {
        country_code: "RU",
        legal_code: "MF12",
        description: "CANCELLING A UTILITY MODEL PATENT (PARTIAL INVALIDATION THEREOF)"
    },
    {
        country_code: "RU",
        legal_code: "MF1K",
        description: "CANCELLING A UTILITY MODEL PATENT"
    },
    {
        country_code: "RU",
        legal_code: "MF41",
        description: "CANCELLING AN INVENTION PATENT (TOTAL INVALIDATION OF THE PATENT)"
    },
    {
        country_code: "RU",
        legal_code: "MF42",
        description: "CANCELLING AN INVENTION PATENT (PARTIAL INVALIDATION OF THE PATENT)"
    },
    {
        country_code: "RU",
        legal_code: "MF4A",
        description: "CANCELLING AN INVENTION PATENT"
    },
    {
        country_code: "RU",
        legal_code: "MG11",
        description: "ANTICIPATORY LAPSE OF A UTILITY MODEL PATENT IN CASE OF GRANTING AN IDENTICAL UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "MG1K",
        description: "ANTICIPATORY LAPSE OF A UTILITY MODEL PATENT IN CASE OF GRANTING AN IDENTICAL UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "MG4A",
        description: "ANTICIPATORY LAPSE OF AN INVENTION PATENT IN THE CASE OF GRANTING A PATENT ON AN IDENTICAL INVENTION"
    },
    {
        country_code: "RU",
        legal_code: "MM1K",
        description: "UTILITY MODEL HAS BECOME INVALID (NON-PAYMENT OF FEES)"
    },
    {
        country_code: "RU",
        legal_code: "MM4A",
        description: "THE PATENT IS INVALID DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "RU",
        legal_code: "MZ1K",
        description: "UTILITY MODEL IS VOID"
    },
    {
        country_code: "RU",
        legal_code: "MZ4A",
        description: "PATENT IS VOID"
    },
    {
        country_code: "RU",
        legal_code: "ND1K",
        description: "EXTENDING UTILITY MODEL PATENT DURATION"
    },
    {
        country_code: "RU",
        legal_code: "ND4A",
        description: "EXTENSION OF PATENT DURATION"
    },
    {
        country_code: "RU",
        legal_code: "NF1K",
        description: "REINSTATEMENT OF UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "NF4A",
        description: "REINSTATEMENT OF PATENT"
    },
    {
        country_code: "RU",
        legal_code: "PA4F",
        description: "CONVERTING USSR INVENTOR'S CERTIFICATE INTO RUSSIAN FEDERATION PATENT"
    },
    {
        country_code: "RU",
        legal_code: "PC11",
        description: "OFFICIAL REGISTRATION OF THE TRANSFER OF EXCLUSIVE RIGHT"
    },
    {
        country_code: "RU",
        legal_code: "PC12",
        description: "OFFICIAL REGISTRATION OF THE TRANSFER OF THE EXCLUSIVE RIGHT WITHOUT CONTRACT FOR UTILITY MODELS"
    },
    {
        country_code: "RU",
        legal_code: "PC1K",
        description: "ASSIGNMENT OF UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "PC41",
        description: "OFFICIAL REGISTRATION OF THE TRANSFER OF EXCLUSIVE RIGHT"
    },
    {
        country_code: "RU",
        legal_code: "PC43",
        description: "OFFICIAL REGISTRATION OF THE TRANSFER OF THE EXCLUSIVE RIGHT WITHOUT CONTRACT FOR INVENTIONS"
    },
    {
        country_code: "RU",
        legal_code: "PC4A",
        description: "INVENTION PATENT ASSIGNMENT"
    },
    {
        country_code: "RU",
        legal_code: "PD1K",
        description: "CORRECTION OF NAME OF UTILITY MODEL OWNER"
    },
    {
        country_code: "RU",
        legal_code: "PD4A",
        description: "CORRECTION OF NAME OF PATENT OWNER"
    },
    {
        country_code: "RU",
        legal_code: "PK1K",
        description: "CANCELLING AN ASSIGNMENT AGREEMENT ON A UTILITY PATENT"
    },
    {
        country_code: "RU",
        legal_code: "PZ4A",
        description: "CANCELING CESSION AGREEMENT OF INVENTION PATENT"
    },
    {
        country_code: "RU",
        legal_code: "QA1K",
        description: "UTILITY MODEL OPEN FOR LICENSING"
    },
    {
        country_code: "RU",
        legal_code: "QA4A",
        description: "PATENT OPEN FOR LICENSING"
    },
    {
        country_code: "RU",
        legal_code: "QB1K",
        description: "LICENCE ON USE OF UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "QB4A",
        description: "LICENSE ON USE OF PATENT"
    },
    {
        country_code: "RU",
        legal_code: "QC11",
        description: "OFFICIAL REGISTRATION OF THE TERMINATION OF THE LICENCE AGREEMENT OR OTHER AGREEMENTS ON THE DISPOSAL OF AN EXCLUSIVE RIGHT"
    },
    {
        country_code: "RU",
        legal_code: "QC41",
        description: "OFFICIAL REGISTRATION OF THE TERMINATION OF THE LICENCE AGREEMENT OR OTHER AGREEMENTS ON THE DISPOSAL OF AN EXCLUSIVE RIGHT"
    },
    {
        country_code: "RU",
        legal_code: "QZ11",
        description: "OFFICICAL REGISTRATION OF CHANGES TO A REGISTERED AGREEMENT (UTILITY MODEL)"
    },
    {
        country_code: "RU",
        legal_code: "QZ1K",
        description: "CHANGES IN THE LICENCE OF UTILITY MODEL"
    },
    {
        country_code: "RU",
        legal_code: "QZ41",
        description: "OFFICIAL REGISTRATION OF CHANGES TO A REGISTERED AGREEMENT (PATENT)"
    },
    {
        country_code: "RU",
        legal_code: "QZ42",
        description: "WITHDRAWAL OF AN OPEN USER PERMIT LICENCE"
    },
    {
        country_code: "RU",
        legal_code: "QZ45",
        description: "WITHDRAWAL OF DECLARATION OF GRANTING ANY PERSON THE RIGHT TO USE THE INVENTION"
    },
    {
        country_code: "RU",
        legal_code: "QZ46",
        description: "WITHDRAWAL OF STATEMENT ABOUT OBLIGATION OF CONCLUDING THE CONTRACT OF ASSIGNMENT OF PATENTS ACC. POINT 3 PAR 1366 CIVIL CODE OF RUSSIA"
    },
    {
        country_code: "RU",
        legal_code: "QZ4A",
        description: "CHANGES OF THE LICENCE ON PATENT"
    },
    {
        country_code: "RU",
        legal_code: "RH1K",
        description: "COPY OF UTILITY MODEL GRANTED THAT WAS DUPLICATED FOR THE RUSSIAN FEDERATION"
    },
    {
        country_code: "RU",
        legal_code: "RH4A",
        description: "COPY OF PATENT GRANTED THAT WAS DUPLICATED FOR THE RUSSIAN FEDERATION"
    },
    {
        country_code: "RU",
        legal_code: "RH4F",
        description: "COPY OF INVENTOR'S CERTIFICATE GRANTED THAT WAS DUPLICATED FOR THE RUSSIAN FEDERATION"
    },
    {
        country_code: "RU",
        legal_code: "RL1K",
        description: "JUDICIAL DECISION"
    },
    {
        country_code: "RU",
        legal_code: "RL4A",
        description: "JUDICIAL DECISION"
    },
    {
        country_code: "RU",
        legal_code: "RZ1K",
        description: "OTHER CHANGES IN THE INFORMATION ABOUT AN INVENTION"
    },
    {
        country_code: "RU",
        legal_code: "RZ4A",
        description: "OTHER CHANGES IN THE INFORMATION ABOUT AN INVENTION"
    },
    {
        country_code: "RU",
        legal_code: "TB1K",
        description: "CHANGE IN AUTHOR'S OR UTILITY MODLER HOLDER'S SURNAME, NAME OR PATRONYMIC"
    },
    {
        country_code: "RU",
        legal_code: "TB4A",
        description: "ALTERING SURNAME, NAME, PATRONYMIC OF PATENT AUTHOR OR INVENTOR"
    },
    {
        country_code: "RU",
        legal_code: "TC1K",
        description: "CHANGE IN THE GROUP OF UTILITY MODEL AUTHORS"
    },
    {
        country_code: "RU",
        legal_code: "TC4A",
        description: "ALTERING THE GROUP OF INVENTION AUTHORS"
    },
    {
        country_code: "RU",
        legal_code: "TH1A",
        description: "REISSUE OF PATENT APPLICATION"
    },
    {
        country_code: "RU",
        legal_code: "TH1K",
        description: "REISSUE OF UTILITY MODEL (1ST PAGE)"
    },
    {
        country_code: "RU",
        legal_code: "TH4A",
        description: "REISSUE OF PATENT SPECIFICATION"
    },
    {
        country_code: "RU",
        legal_code: "TK1K",
        description: "CORRECTION TO THE PUBLICATION IN THE BULLETIN (UTILITY MODEL)"
    },
    {
        country_code: "RU",
        legal_code: "TK4A",
        description: "CORRECTION TO THE PUBLICATION IN THE BULLETIN (PATENT)"
    },
    {
        country_code: "RU",
        legal_code: "TZ1K",
        description: "FIRST PAGE CORRECTIONS (UTILITY MODEL)"
    },
    {
        country_code: "RU",
        legal_code: "TZ4A",
        description: "AMENDMENTS OF PATENT SPECIFICATION"
    },
    {
        country_code: "SE",
        legal_code: "CANC",
        description: "PATENT CANCELLED; REJECTED AFTER OPPOSITION"
    },
    {
        country_code: "SE",
        legal_code: "CORR",
        description: "CORRECTIONS"
    },
    {
        country_code: "SE",
        legal_code: "ECNC",
        description: "EUROPEAN PATENT HAS BEEN CANCELLED"
    },
    {
        country_code: "SE",
        legal_code: "EUG",
        description: "EUROPEAN PATENT HAS LAPSED"
    },
    {
        country_code: "SE",
        legal_code: "LMEP",
        description: "LIMITATION BY THE EPO"
    },
    {
        country_code: "SE",
        legal_code: "NAL",
        description: "PATENT IN FORCE"
    },
    {
        country_code: "SE",
        legal_code: "NAV",
        description: "PATENT APPLICATION HAS LAPSED"
    },
    {
        country_code: "SE",
        legal_code: "NUG",
        description: "PATENT HAS LAPSED"
    },
    {
        country_code: "SE",
        legal_code: "OPRJ",
        description: "OPPOSITION HAVE BEEN REJECTED"
    },
    {
        country_code: "SE",
        legal_code: "R40A",
        description: "REVOCATION ACCORDING PAR. 40A PATENTLAGEN"
    },
    {
        country_code: "SE",
        legal_code: "RE72",
        description: "REINSTATEMENT ACCORDING PAR 72 PATENTLAGEN"
    },
    {
        country_code: "SE",
        legal_code: "REB3",
        description: "PATENT HAVE BEEN RESTRICTED BY THE EPO"
    },
    {
        country_code: "SE",
        legal_code: "REJA",
        description: "REJECTION OF A PUBLISHED PATENT APPLIATION"
    },
    {
        country_code: "SE",
        legal_code: "RINS",
        description: "REINSTATEMENT AFTER APPEAL AGAINST DECISIONS REGARDING ABANDONING, NON-PAYMENT OF FEES, MISSED DEADLINES AND SIMILAR ISSUES"
    },
    {
        country_code: "SE",
        legal_code: "RPEO",
        description: "EP PATENT HAVE BEEN REPUBLISHED IN MODIFIED FORM AFTER OPPOSITION AT EPO"
    },
    {
        country_code: "SE",
        legal_code: "RPOP",
        description: "REPUBLISHED IN MODIFIED FORM AFTER OPPOSITION"
    },
    {
        country_code: "SE",
        legal_code: "RPOT",
        description: "EP PATENT HAVE BEEN REPUBLISHED WITH A CORRECTED SWEDISH TRANSLATION"
    },
    {
        country_code: "SE",
        legal_code: "RSE3",
        description: "PATENT HAS BEEN RESTRICTED"
    },
    {
        country_code: "SE",
        legal_code: "SPCC",
        description: "SUPPLEMENTARY PROTECTION CERTIFICAE IS INVALID AS THE GROUND PATENT HAS EXPIRED BEFORE THE 20-YEAR PROTECTION PERIOD"
    },
    {
        country_code: "SE",
        legal_code: "SPCE",
        description: "APPLICATION TO EXTEND SPC"
    },
    {
        country_code: "SE",
        legal_code: "SPCF",
        description: "APPLICATION FOR SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "SE",
        legal_code: "SPCG",
        description: "GRANTED SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "SE",
        legal_code: "SPCH",
        description: "EXTENSION OF SPC GRANTED"
    },
    {
        country_code: "SE",
        legal_code: "SPCL",
        description: "SUPPLEMENATARY PROTECTION CERTIFICATE LAPSED"
    },
    {
        country_code: "SE",
        legal_code: "SPCR",
        description: "REJECTED APPLICATION FOR SPC"
    },
    {
        country_code: "SE",
        legal_code: "SPCS",
        description: "SPC REVOKED UNDER PAR. 40A PATENTS ACT"
    },
    {
        country_code: "SE",
        legal_code: "SPCX",
        description: "EXPIRY OF A SUPPLEMENTARY PROTECTION CERTIFICATE"
    },
    {
        country_code: "SE",
        legal_code: "SPCY",
        description: "REJECTION OF THE EXTENSION FOR AN SPC"
    },
    {
        country_code: "SE",
        legal_code: "SPCZ",
        description: "EXTENSION OF SUPPLEMENTARY PROTECTION CERTIFICATE GRANTED"
    },
    {
        country_code: "SE",
        legal_code: "TRCL",
        description: "SWEDISH TRANSLATION OF THE CLAIMS HAVE BEEN FILED"
    },
    {
        country_code: "SE",
        legal_code: "TRGR",
        description: "TRANSLATION OF GRANTED EP PATENT"
    },
    {
        country_code: "SE",
        legal_code: "WITD",
        description: "PATENT WITHDRAWN ACC. PAR 54 PATENTLAGEN"
    },
    {
        country_code: "SI",
        legal_code: "IF",
        description: "VALID ON THE PRS DATE"
    },
    {
        country_code: "SI",
        legal_code: "KO00",
        description: "LAPSE OF PATENT"
    },
    {
        country_code: "SI",
        legal_code: "LIQB",
        description: "ENTRY OF DATA ON LICENCE OR SUBLICENCE IN THE REGISTER"
    },
    {
        country_code: "SI",
        legal_code: "LIQC",
        description: "DELETION OF DATA ON LICENCE OR SUBLICENCE IN THE REGISTER"
    },
    {
        country_code: "SI",
        legal_code: "LISP",
        description: "CHANGE OF DATA ON LICENCE OR SUBLICENCE"
    },
    {
        country_code: "SI",
        legal_code: "NC00",
        description: "ANNULMENT; PUBLICATION OF A DECISION ON ANNULMENT OF RIGHT DUE TO COURT DECISION OR NON-FULFILMENT OF CONDITIONS FOR PATENT PROTECTION"
    },
    {
        country_code: "SI",
        legal_code: "OO00",
        description: "GRANT OF PATENT"
    },
    {
        country_code: "SI",
        legal_code: "OU01",
        description: "DECISON ACCORDING TO ARTICLE 73(1) IPA 1992; PUBLICATION OF DECISION ON FULFILMENT OF CONDITIONS ON PATENTABILITY"
    },
    {
        country_code: "SI",
        legal_code: "OU02",
        description: "DECISION ACCORDING TO ARTICLE 73(2) IPA 1992; PUBLICATION OF DECISION ON PARTIAL FULFILMENT OF THE INVENTION AND CHANGE OF PATENT CLAIMS"
    },
    {
        country_code: "SI",
        legal_code: "OU0A",
        description: "DECISION ACCORDING TO ARTICLE 93(A) IPA 2001; PUBLICATION OF DECISION ON FULFILMENT OF CONDITIONS ON PATENTABILITY"
    },
    {
        country_code: "SI",
        legal_code: "OU0B",
        description: "DECISION ACCORDING TO ARTICLE 93(B) IPA 2001; PUBLICATION OF DECISION ON PARTIAL FULFILMENT OF CONDITIONS ON PATENTABILITY AND CHANGE OF PATENT CLAIMS"
    },
    {
        country_code: "SI",
        legal_code: "SP72",
        description: "CHANGE OF DATA ON INVENTOR"
    },
    {
        country_code: "SI",
        legal_code: "SP73",
        description: "CHANGE OF DATA ON OWNER"
    },
    {
        country_code: "Slovak",
        legal_code: "Rebuplic",
        description: ""
    },
    {
        country_code: "SK",
        legal_code: "BA9A",
        description: "TRANSLATION OF THE CLAIM INTO SLOVAKIAN"
    },
    {
        country_code: "SK",
        legal_code: "FA9A",
        description: "SUSPENDED PATENT APPLICATION PROCEDURE AT REQUEST OF AN APPLICANT"
    },
    {
        country_code: "SK",
        legal_code: "FB9A",
        description: "SUSPENDED PATENT APPLICATION PROCEDURE"
    },
    {
        country_code: "SK",
        legal_code: "FC9A",
        description: "REFUSED PATENT APPLICATION"
    },
    {
        country_code: "SK",
        legal_code: "FD9A",
        description: "SUSPENDED PROCEDURES DUE TO NON-PAYMENT OF FEE"
    },
    {
        country_code: "SK",
        legal_code: "MC4A",
        description: "ANNULEMENT OF PATENT"
    },
    {
        country_code: "SK",
        legal_code: "MG4A",
        description: "PARTIAL REVOCATION OF INVENTOR'S CERTIFICATE"
    },
    {
        country_code: "SK",
        legal_code: "MK4A",
        description: "EXPIRY OF PATENT"
    },
    {
        country_code: "SK",
        legal_code: "MM4A",
        description: "PATENT LAPSED DUE TO NON-PAYMENT OF MAINTENANCE FEES"
    },
    {
        country_code: "SK",
        legal_code: "PC4A",
        description: "ASSIGNMENT AND TRANSFER OF RIGHTS"
    },
    {
        country_code: "SK",
        legal_code: "PD4A",
        description: "LIEN (CHANGE OF THE RIGHTS OF DISPOSAL)"
    },
    {
        country_code: "SK",
        legal_code: "QA4A",
        description: "LICENCE OFFER TO PATENT"
    },
    {
        country_code: "SK",
        legal_code: "QB4A",
        description: "LICENCE CONTRACT REGISTERED OR GRANTED"
    },
    {
        country_code: "SK",
        legal_code: "QC4A",
        description: "TERMINATION OF LICENCE CONTRACT TO A PATENT"
    },
    {
        country_code: "SK",
        legal_code: "SPCC",
        description: "CHANGE OF ADDRESS OR NAME OF AN OWNER OF AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCE",
        description: "EXPIRY OF AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCF",
        description: "FILING AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCG",
        description: "GRANT OF AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCR",
        description: "REJECTION OF AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCT",
        description: "TRANSFER OF RIGHTS OF AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCW",
        description: "SPC WITHDRAWN BEFORE EXPIRY OF BASIC PATENT"
    },
    {
        country_code: "SK",
        legal_code: "SPCX",
        description: "SPC APPLICATION WITHDRAWN BEFORE GRANT OF SPC"
    },
    {
        country_code: "SK",
        legal_code: "SPCY",
        description: "APPLICATION TO EXTEND AN SPC"
    },
    {
        country_code: "SK",
        legal_code: "T3",
        description: "TRANSLATION OF EUROPEAN PATENT SPECIFICATION INTO SLOVAKIAN"
    },
    {
        country_code: "SK",
        legal_code: "T4",
        description: "CHANGED SLOVAKIAN TRANSLATION OF A EUROPEAN PATENT SPECIFICATION (CHANGED OR MODIFIED BY OWNER)"
    },
    {
        country_code: "SK",
        legal_code: "T5",
        description: "TRANSLATION OF AN AMENDED EUROPEAN PATENT SPECIFICATION"
    },
    {
        country_code: "SK",
        legal_code: "TA4A",
        description: "CHANGE OF INVENTOR(S) NAME"
    },
    {
        country_code: "SK",
        legal_code: "TB4A",
        description: "CORRECTION OF NAMES"
    },
    {
        country_code: "SK",
        legal_code: "TC4A",
        description: "CHANGE OF OWNER'S NAME"
    },
    {
        country_code: "SK",
        legal_code: "TE4A",
        description: "CHANGE OF OWNER'S ADDRESS"
    },
    {
        country_code: "SK",
        legal_code: "TH4A",
        description: "GENERAL CORRECTION OR CHANGES"
    },
    {
        country_code: "Soviet",
        legal_code: "Union",
        description: ""
    },
    {
        country_code: "SU",
        legal_code: "REG",
        description: "REFERENCE TO A CODE OF A SUCCESSION STATE"
    },
    {
        country_code: "El",
        legal_code: "Salvador",
        description: ""
    },
    {
        country_code: "SV",
        legal_code: "FA",
        description: "ABANDONMENT"
    },
    {
        country_code: "SV",
        legal_code: "FC",
        description: "REFUSAL"
    },
    {
        country_code: "SV",
        legal_code: "FD",
        description: "LAPSE"
    },
    {
        country_code: "SV",
        legal_code: "FG",
        description: "GRANT"
    },
    {
        country_code: "TW",
        legal_code: "GD4A",
        description: "ISSUE OF PATENT CERTIFICATE FOR GRANTED INVENTION PATENT"
    },
    {
        country_code: "TW",
        legal_code: "GD4K",
        description: "ISSUE OF PATENT CERTIFICATE FOR GRANTED UTILITY MODEL FILED BEFORE JUNE 30, 2004"
    },
    {
        country_code: "TW",
        legal_code: "KA4A",
        description: "RENEWAL FEE DUE FOR A GRANTED PATENT"
    },
    {
        country_code: "TW",
        legal_code: "KA4K",
        description: "RENEWAL FEE DUE FOR A GRANTED UTILITY MODEL"
    },
    {
        country_code: "TW",
        legal_code: "KB4A",
        description: "RENEWAL FEE PAID FOR A GRANTED PATENT"
    },
    {
        country_code: "TW",
        legal_code: "KB4K",
        description: "RENEWAL FEE PAID FOR A UTILITY MODEL"
    },
    {
        country_code: "TW",
        legal_code: "MA4A",
        description: "ABANDONMENT OR WITHDRAWAL OF AN INVENTION PATENT"
    },
    {
        country_code: "TW",
        legal_code: "MA4K",
        description: "ABANDONMENT OR WITHDRAWAL OF A UTILITY MODEL"
    },
    {
        country_code: "TW",
        legal_code: "MC4A",
        description: "REVOCATION OF GRANTED PATENT"
    },
    {
        country_code: "TW",
        legal_code: "MC4K",
        description: "REVOCATION OF GRANTED UTILITY MODEL"
    },
    {
        country_code: "TW",
        legal_code: "MK4A",
        description: "EXPIRATION OF PATENT TERM OF AN INVENTION PATENT"
    },
    {
        country_code: "TW",
        legal_code: "MK4K",
        description: "EXPIRATION OF PATENT TERM OF A GRANTED UTILITY MODEL"
    },
    {
        country_code: "TW",
        legal_code: "MM4A",
        description: "ANNULMENT OR LAPSE OF PATENT DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "TW",
        legal_code: "MM4K",
        description: "ANNULMENT OR LAPSE OF A UTILITY MODEL DUE TO NON-PAYMENT OF FEES"
    },
    {
        country_code: "United",
        legal_code: "States",
        description: ""
    },
    {
        country_code: "US",
        legal_code: "355",
        description: "PATENT TERM EXTENSION UNDER 35 U.S.C. 155 UNTIL/FOR"
    },
    {
        country_code: "US",
        legal_code: "355A",
        description: "PATENT TERM EXTENSION OR PATENT TERM RESTORATION ACCORDING TO 35 U.S.C. 155, 155A OR 156"
    },
    {
        country_code: "US",
        legal_code: "356",
        description: "PATENT TERM EXTENSION UNDER 35 U.S.C. 156"
    },
    {
        country_code: "US",
        legal_code: "712F",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECTION 12(1)/1977 UK LAW)"
    },
    {
        country_code: "US",
        legal_code: "712J",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECT. 12/1977)"
    },
    {
        country_code: "US",
        legal_code: "740B",
        description: "GB: APPLICATION DECIDED BY THE COMPTROLLER (SECT. 40/1977)"
    },
    {
        country_code: "US",
        legal_code: "946",
        description: "PATENT TERM EXTENSION PRIVATE LAW 98-46 UNTIL/FOR"
    },
    {
        country_code: "US",
        legal_code: "AS",
        description: "ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS01",
        description: "CHANGE OF NAME"
    },
    {
        country_code: "US",
        legal_code: "AS02",
        description: "ASSIGNMENT OF ASSIGNOR'S INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS03",
        description: "MERGER"
    },
    {
        country_code: "US",
        legal_code: "AS04",
        description: "LICENSE"
    },
    {
        country_code: "US",
        legal_code: "AS05",
        description: "LETTERS TESTAMENTARY"
    },
    {
        country_code: "US",
        legal_code: "AS06",
        description: "SECURITY INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS07",
        description: "MORTGAGE"
    },
    {
        country_code: "US",
        legal_code: "AS08",
        description: "CONDITIONAL ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS09",
        description: "ASSIGNMENT OF A PART OF ASSIGNORS INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS10",
        description: "ASSIGNMENT OF 1/2 OF ASSIGNORS INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS11",
        description: "ASSIGNMENT OF 1/4 OF ASSIGNORS INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS12",
        description: "COURT APPOINTMENT"
    },
    {
        country_code: "US",
        legal_code: "AS13",
        description: "DECREE OF DISTRIBUTION"
    },
    {
        country_code: "US",
        legal_code: "AS14",
        description: "LETTERS OF ADMINISTRATION"
    },
    {
        country_code: "US",
        legal_code: "AS15",
        description: "LIEN"
    },
    {
        country_code: "US",
        legal_code: "AS16",
        description: "OPTION"
    },
    {
        country_code: "US",
        legal_code: "AS17",
        description: "RELEASE BY SECURED PARTY"
    },
    {
        country_code: "US",
        legal_code: "AS18",
        description: "ASSIGNMENT OF ASSIGNOR'S INTEREST - CORRECTION INFORMATION"
    },
    {
        country_code: "US",
        legal_code: "AS19",
        description: "CORRECTIVE ASSIGNMENT - CORRECT PREVIOUS ITEM"
    },
    {
        country_code: "US",
        legal_code: "AS20",
        description: "ASSIGN THE ENTIRE INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS21",
        description: "CHANGE OF ADDRESS"
    },
    {
        country_code: "US",
        legal_code: "AS22",
        description: "COLLATERAL ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS23",
        description: "MERGER AND CHANGE OF NAME"
    },
    {
        country_code: "US",
        legal_code: "AS24",
        description: "RELEASE OF SECURITY AGREEMENT"
    },
    {
        country_code: "US",
        legal_code: "AS25",
        description: "RELEASE OF SECURITY INTEREST"
    },
    {
        country_code: "US",
        legal_code: "AS26",
        description: "SECURITY AGREEMENT"
    },
    {
        country_code: "US",
        legal_code: "AS27",
        description: "NUNC PRO TUNC ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS28",
        description: "CORRECTED ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS29",
        description: "BILL OF SALE"
    },
    {
        country_code: "US",
        legal_code: "AS30",
        description: "CONFIRMATORY ASSIGNMENT"
    },
    {
        country_code: "US",
        legal_code: "AS31",
        description: "CONFIRMATORY LICENSE"
    },
    {
        country_code: "US",
        legal_code: "AS32",
        description: "CORRECTED RECORDATION FOR COVER SHEET"
    },
    {
        country_code: "US",
        legal_code: "AS33",
        description: "EXCLUSIVE LICENSE"
    },
    {
        country_code: "US",
        legal_code: "AS34",
        description: "RE-RECORD OF AN INSTRUMENT RECORDED"
    },
    {
        country_code: "US",
        legal_code: "AS35",
        description: "RELEASE"
    },
    {
        country_code: "US",
        legal_code: "AS36",
        description: "RE-RECORD TO CORRECT ERROR IN RECORDATION DATA"
    },
    {
        country_code: "US",
        legal_code: "AS37",
        description: "TO CORRECT THE NAME OF THE ASSIGNEE"
    },
    {
        country_code: "US",
        legal_code: "AS99",
        description: "OTHER ASSIGNMENTS"
    },
    {
        country_code: "US",
        legal_code: "B1",
        description: "REEXAMINATION CERTIFICATE FIRST REEXAMINATION"
    },
    {
        country_code: "US",
        legal_code: "B2",
        description: "REEXAMINATION CERTIFICATE SECOND REEXAMINATION"
    },
    {
        country_code: "US",
        legal_code: "B3",
        description: "REEXAMINATION CERTIFICATE THIRD OR FURTHER REEXAMINATION"
    },
    {
        country_code: "US",
        legal_code: "C1",
        description: "REEXAMINATION CERTIFICATE (1ST LEVEL)"
    },
    {
        country_code: "US",
        legal_code: "C2",
        description: "REEXAMINATION CERTIFICATE (2ND LEVEL)"
    },
    {
        country_code: "US",
        legal_code: "C3",
        description: "REEXAMINATION CERTIFICATE (3RD LEVEL)"
    },
    {
        country_code: "US",
        legal_code: "CBM",
        description: "AIA TRIAL PROCEEDING FILED BEFORE PATENT TRIAL AND APPEAL BOARD: COVERED BUSINESS METHODS"
    },
    {
        country_code: "US",
        legal_code: "CC",
        description: "CERTIFICATE OF CORRECTION"
    },
    {
        country_code: "US",
        legal_code: "CCB",
        description: "CERTIFICATE OF CORRECTION FOR REEXAMINATION"
    },
    {
        country_code: "US",
        legal_code: "CO",
        description: "COMMISSIONER ORDERED REEXAMINATION"
    },
    {
        country_code: "US",
        legal_code: "D356",
        description: "DISAPPEARED FROM LIST FOR PATENT TERM EXTENSION UNDER 35 U.S.C. 156"
    },
    {
        country_code: "US",
        legal_code: "DC",
        description: "DISCLAIMER FILED"
    },
    {
        country_code: "US",
        legal_code: "DCB",
        description: "DISCLAIMER FOR REEXAMINATION FILED"
    },
    {
        country_code: "US",
        legal_code: "DD",
        description: "DISCLAIMER AND DEDICATION FILED"
    },
    {
        country_code: "US",
        legal_code: "DE",
        description: "DEDICATION FILED"
    },
    {
        country_code: "US",
        legal_code: "DI",
        description: "ADVERSE DECISION IN INTERFERENCE"
    },
    {
        country_code: "US",
        legal_code: "DJ",
        description: "ALL REFERENCES SHOULD BE DELETED, NO PATENT WAS GRANTED"
    },
    {
        country_code: "US",
        legal_code: "DJB",
        description: "ALL REFERENCES SHOULD BE DELETED, NO REEXAMINATION CERTIFICATE WAS ISSUED"
    },
    {
        country_code: "US",
        legal_code: "DP",
        description: "NOTIFICATION OF ACCEPTANCE OF DELAYED PAYMENT OF MAINTENANCE FEE"
    },
    {
        country_code: "US",
        legal_code: "DR",
        description: "ADVERSE DECISION IN REFERENCE"
    },
    {
        country_code: "US",
        legal_code: "ER",
        description: "ERRATUM"
    },
    {
        country_code: "US",
        legal_code: "ERFP",
        description: "INACCURATELY LISTED AS HAVING EXPIRED WHEN, IN FACT, THEY DID NOT EXPIRE"
    },
    {
        country_code: "US",
        legal_code: "ERR",
        description: "ERRATUM"
    },
    {
        country_code: "US",
        legal_code: "FP",
        description: "EXPIRED DUE TO FAILURE TO PAY MAINTENANCE FEE"
    },
    {
        country_code: "US",
        legal_code: "FPAY",
        description: "FEE PAYMENT"
    },
    {
        country_code: "US",
        legal_code: "FPB1",
        description: "EXPIRED DUE TO REEXAMINATION WHICH CANCELED ALL CLAIMS"
    },
    {
        country_code: "US",
        legal_code: "FPB2",
        description: "EXPIRED DUE TO REEXAMINATION WHICH CANCELED ALL CLAIMS (2ND REEXAMINATION)"
    },
    {
        country_code: "US",
        legal_code: "FPB3",
        description: "EXPIRED DUE TO REEXAMINATION WHICH CANCELED ALL CLAIMS (3RD REEXAMINATION)"
    },
    {
        country_code: "US",
        legal_code: "FPIR",
        description: "UMTIMELY FEE PAYMENT OR OTHER IRREGULARITIES IN FEE PAYMENT"
    },
    {
        country_code: "US",
        legal_code: "IPR",
        description: "AIA TRIAL PROCEEDING FILED BEFORE THE PATENT AND APPEAL BOARD: INTER PARTES REVIEW"
    },
    {
        country_code: "US",
        legal_code: "LAPS",
        description: "LAPSE FOR FAILURE TO PAY MAINTENANCE FEES"
    },
    {
        country_code: "US",
        legal_code: "PA",
        description: "PATENT AVAILABLE FOR LICENSE OR SALE"
    },
    {
        country_code: "US",
        legal_code: "PEL",
        description: "PATENT TERM EXTENSION"
    },
    {
        country_code: "US",
        legal_code: "PRDP",
        description: "PATENT REINSTATED DUE TO THE ACCEPTANCE OF A LATE MAINTENANCE FEE"
    },
    {
        country_code: "US",
        legal_code: "PS",
        description: "PATENT SUIT(S) FILED"
    },
    {
        country_code: "US",
        legal_code: "REIN",
        description: "REINSTATEMENT AFTER MAINTENANCE FEE PAYMENT CONFIRMED"
    },
    {
        country_code: "US",
        legal_code: "REMI",
        description: "MAINTENANCE FEE REMINDER MAILED"
    },
    {
        country_code: "US",
        legal_code: "RF",
        description: "REISSUE APPLICATION FILED"
    },
    {
        country_code: "US",
        legal_code: "RN",
        description: "RECISSION OF NOTICE OF PATENT EXPIRATION"
    },
    {
        country_code: "US",
        legal_code: "RR",
        description: "REQUEST FOR REEXAMINATION FILED"
    },
    {
        country_code: "US",
        legal_code: "SULP",
        description: "SURCHARGE FOR LATE PAYMENT"
    },
    {
        country_code: "US",
        legal_code: "WDB1",
        description: "REEXAMINATION: THIS PATENT WAS WITHDRAWN PRIOR TO ISSUE"
    },
    {
        country_code: "US",
        legal_code: "WDR",
        description: "PATENT WITHDRAWN ACCORDING TO LISTING ISSUED BY THE USPTO ON PRS-DATE"
    },
    {
        country_code: "US",
        legal_code: "X",
        description: "NO DOCUMENT PUBLISHED"
    },
    {
        country_code: "US",
        legal_code: "XAS",
        description: "NOT ANY MORE IN US ASSIGNMENT DATABASE"
    },
    {
        country_code: "US",
        legal_code: "XB",
        description: "PATENT (REEXAMINATION CERTIFICATE) NOT ISSUED"
    },
    {
        country_code: "US",
        legal_code: "XE",
        description: "PATENT (REISSUE) NOT ISSUED"
    },
    {
        country_code: "US",
        legal_code: "XT",
        description: "DEFENSIVE PUB. NOT PUBLISHED"
    },
    {
        country_code: "US",
        legal_code: "XX",
        description: "MISCELLANEOUS:"
    },
    {
        country_code: "WIPO",
        legal_code: "(PCT)",
        description: ""
    },
    {
        country_code: "WO",
        legal_code: "121",
        description: "EP: THE EPO HAS BEEN INFORMED BY WIPO THAT EP WAS DESIGNATED IN THIS APPLICATION"
    },
    {
        country_code: "WO",
        legal_code: "122",
        description: "EP: PCT APP. NOT ENT. EUROP. PHASE"
    },
    {
        country_code: "WO",
        legal_code: "32PN",
        description: "EP: PUBLIC NOTIFICATION IN THE EP BULLETIN AS ADDRESS OF THE ADRESSEE CANNOT BE ESTABLISHED"
    },
    {
        country_code: "WO",
        legal_code: "708H",
        description: "GB: DETERMINATION BEFORE GRANT OF UK ENTITLEMENT (SECTION 8(1)/1977)"
    },
    {
        country_code: "WO",
        legal_code: "710B",
        description: "GB: PROCEEDING UNDER RULE 110(4) PATENTS ACT 1977"
    },
    {
        country_code: "WO",
        legal_code: "712F",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECTION 12(1)/1977)"
    },
    {
        country_code: "WO",
        legal_code: "712G",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECT. 12(1)/1977) WITHDRAWN"
    },
    {
        country_code: "WO",
        legal_code: "712J",
        description: "GB: REFERENCE DECIDED BY THE COMPTROLLER - REF. UNDER SECT. 12(1) DETERMINATION OF FOREIGN ENTITLEMENT"
    },
    {
        country_code: "WO",
        legal_code: "713B",
        description: "GB: PROCEEDING UNDER SECTION 13(1) PATENTS ACT 1977"
    },
    {
        country_code: "WO",
        legal_code: "713C",
        description: "GB: PROC. UNDER SECT. 13(3) PAT. ACT 1977"
    },
    {
        country_code: "WO",
        legal_code: "713D",
        description: "GB: PROC. UNDER SECT. 13(1) PAT. ACT 1977 ** APPL. FILED"
    },
    {
        country_code: "WO",
        legal_code: "713F",
        description: "GB: APPLICATION FOR MENTION OF INVENTOR (SECT. 13(1)/1977) ALLOWED"
    },
    {
        country_code: "WO",
        legal_code: "713H",
        description: "GB: APPLICATION FILED FOR A PERSON NOT BE MENTIONED AS AN INVENTOR - SECTION 13(3) PAT. ACTS 1972"
    },
    {
        country_code: "WO",
        legal_code: "8642",
        description: "IMPACT ABOLISHED FOR DE"
    },
    {
        country_code: "WO",
        legal_code: "AK",
        description: "DESIGNATED STATES"
    },
    {
        country_code: "WO",
        legal_code: "AL",
        description: "DESIGNATED COUNTRIES FOR REGIONAL PATENTS"
    },
    {
        country_code: "WO",
        legal_code: "AN",
        description: "ELECTED STATES"
    },
    {
        country_code: "WO",
        legal_code: "B",
        description: "LATER PUBLICATION OF AMENDED CLAIMS"
    },
    {
        country_code: "WO",
        legal_code: "BE20",
        description: "BE: PATENT EXPIRED"
    },
    {
        country_code: "WO",
        legal_code: "BECA",
        description: "BE: CHANGE OF HOLDER'S ADRESS"
    },
    {
        country_code: "WO",
        legal_code: "BECH",
        description: "BE: CHANGE OF HOLDER"
    },
    {
        country_code: "WO",
        legal_code: "BECN",
        description: "BE: CHANGE OF HOLDER'S NAME"
    },
    {
        country_code: "WO",
        legal_code: "BERE",
        description: "BE: LAPSED"
    },
    {
        country_code: "WO",
        legal_code: "BERR",
        description: "BE: REESTABLISHED"
    },
    {
        country_code: "WO",
        legal_code: "CFP",
        description: "CORRECTED VERSION OF A PAMPHLET FRONT PAGE"
    },
    {
        country_code: "WO",
        legal_code: "COP",
        description: "CORRECTED VERSION OF PAMPHLET"
    },
    {
        country_code: "WO",
        legal_code: "CR1",
        description: "CORRECTION OF ENTRY IN SECTION I"
    },
    {
        country_code: "WO",
        legal_code: "D17",
        description: "DECLARATION UNDER ARTICLE 17(2)A"
    },
    {
        country_code: "WO",
        legal_code: "DFPE",
        description: "REQUEST FOR PRELIMINARY EXAMINATION FILED PRIOR TO EXPIRATION OF 19TH MONTH FROM PRIORITY DATE (PCT APPLICATION FILED BEFORE 20040101)"
    },
    {
        country_code: "WO",
        legal_code: "DPE1",
        description: "REQUEST FOR PRELIMINARY EXAMINATION FILED AFTER EXPIRATION OF 19TH MONTH FROM PRIORITY DATE (PCT APPLICATION FILED FROM 20040101)"
    },
    {
        country_code: "WO",
        legal_code: "DPE2",
        description: "REQUEST FOR PRELIMINARY EXAMINATION FILED BEFORE EXPIRATION OF 19TH MONTH FROM PRIORITY DATE (PCT APPLICATION FILED FROM 20040101)"
    },
    {
        country_code: "WO",
        legal_code: "DPEN",
        description: "REQUEST FOR PRELIMINARY EXAMINATION FILED PRIOR TO EXPIRATION OF 19TH MONTH FROM PRIORITY DATE (PCT APPLICATION FILED FROM 20040101)"
    },
    {
        country_code: "WO",
        legal_code: "EF",
        description: "FR: CONVERSION TO FRENCH PATENT APPLICATION"
    },
    {
        country_code: "WO",
        legal_code: "EFNL",
        description: "NL: LAYING OPEN TO PUBLIC INSPECTION OF TRANSLATIONS INTO THE NETHERLANDS LANGUAGE OF CLAIMS OF A EUROPEAN PATENT APPLICATION"
    },
    {
        country_code: "WO",
        legal_code: "EL",
        description: "FR: TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "WO",
        legal_code: "EM",
        description: "FR: REVISED TRANSLATION OF CLAIMS FILED"
    },
    {
        country_code: "WO",
        legal_code: "ENP",
        description: "ENTRY INTO THE NATIONAL PHASE IN:"
    },
    {
        country_code: "WO",
        legal_code: "ENPC",
        description: "CORRECTION TO FORMER ANNOUNCEMENT OF ENTRY INTO NATIONAL PHASE; PCT APPLICATION DID NOT ENTER INTO THE NATIONAL PHASE"
    },
    {
        country_code: "WO",
        legal_code: "ENPW",
        description: "STARTED TO ENTER NAT. PHASE AND WAS WITHDRAWN OR FAILED FOR OTHER REASONS"
    },
    {
        country_code: "WO",
        legal_code: "ENPZ",
        description: "FORMER ANNOUNCEMENT OF THE WITHDRAWAL OF THE ENTRY INTO THE NATIONAL PHASE WAS WRONG"
    },
    {
        country_code: "WO",
        legal_code: "ERR",
        description: "ERRATUM:"
    },
    {
        country_code: "WO",
        legal_code: "ET4",
        description: "FR: EP REQUESTED - TRANSLATION OF CLAIMS RECEIVED BY INPI"
    },
    {
        country_code: "WO",
        legal_code: "EX32",
        description: "EXTENSION UNDER RULE 32 EFFECTED AFTER COMPLETION OF TECHNICAL PREPARATION FOR INTERNATIONAL PUBLICATION"
    },
    {
        country_code: "WO",
        legal_code: "GBC",
        description: "GB: TRANSLATION OF CLAIMS FILED FOR EP (GB SECTION 78(7)/1977)"
    },
    {
        country_code: "WO",
        legal_code: "GBFE",
        description: "GB: DETERMINATION OF FOREIGN ENTITLEMENT (SECTION 12(1)/1977)"
    },
    {
        country_code: "WO",
        legal_code: "GBT",
        description: "GB: TRANSLATION FILED FOR EP APPLICATION, PUBLISHED AS PCT PUBLICATION"
    },
    {
        country_code: "WO",
        legal_code: "IECL",
        description: "IE: TRANSLATION OF CLAIMS FILED FOR EP (IE SECTION 120(6))"
    },
    {
        country_code: "WO",
        legal_code: "LE",
        description: "LATER ELECTION FOR INTERNATIONAL APPLICATION FILED PRIOR TO EXPIRATION OF 19TH MONTH FROM PRIORITY DATE"
    },
    {
        country_code: "WO",
        legal_code: "LE32",
        description: "LATER ELECTION FOR INTERNATIONAL APPLICATION FILED PRIOR TO EXPIRATION OF 19TH MONTH FROM PRIORITY DATE OR ACCORDING TO RULE 3"
    },
    {
        country_code: "WO",
        legal_code: "NENP",
        description: "NON-ENTRY INTO THE NATIONAL PHASE IN:"
    },
    {
        country_code: "WO",
        legal_code: "NLE",
        description: "NL: NOTIFICATIONS CONCERNING APPLICATIONS"
    },
    {
        country_code: "WO",
        legal_code: "RCW",
        description: "DECLARATION BY THE RECEIVING OFFICE THAT THE INTERNATIONAL APPLICATION IS CONSIDERED WITHDRAWN"
    },
    {
        country_code: "WO",
        legal_code: "REF",
        description: "CORRESPONDS TO"
    },
    {
        country_code: "WO",
        legal_code: "REG",
        description: "REFERENCE TO NATIONAL CODE"
    },
    {
        country_code: "WO",
        legal_code: "RET",
        description: "DE TRANSLATION (DE OG PART 6B)"
    },
    {
        country_code: "WO",
        legal_code: "TCAT",
        description: "TRANSLATION OF CLAIMS IN AT SUBMITTED"
    },
    {
        country_code: "WO",
        legal_code: "TCNL",
        description: "NL: TRANSLATION OF PATENT CLAIMS OF A EUROPEAN PATENT APPLICATION FILED"
    },
    {
        country_code: "WO",
        legal_code: "TDAT",
        description: "TRANSLATION OF APPLICATION IN AT PUBLISHED"
    },
    {
        country_code: "WO",
        legal_code: "WA",
        description: "WITHDRAWAL OF INTERNATIONAL APPLICATION"
    },
    {
        country_code: "WO",
        legal_code: "WCH",
        description: "APPLICATION REFUSED OR WITHDRAWN IN CH"
    },
    {
        country_code: "WO",
        legal_code: "WD",
        description: "WITHDRAWAL OF DESIGNATIONS AFTER INTERNATIONAL PUBLICATION"
    },
    {
        country_code: "WO",
        legal_code: "WPC",
        description: "WITHDRAWAL OF PRIORITY CLAIMS AFTER COMPLETION OF THE TECHNICAL PREPARATIONS FOR INTERNATIONAL PUBLICATION"
    },
    {
        country_code: "WO",
        legal_code: "WR",
        description: "LATER PUBLICATION OF A REVISED VERSION OF AN INTERNATIONAL SEARCH REPORT"
    },
    {
        country_code: "WO",
        legal_code: "WRT",
        description: "LATER PUBLICATION OF A REVISED VERSION OF AN INTERNATIONAL SEARCH REPORT TRANSLATION"
    },
    {
        country_code: "WO",
        legal_code: "WS",
        description: "LATER PUBLICATION OF A SUPPLEMENTARY INTERNATIONAL SEARCH REPORT"
    },
    {
        country_code: "WO",
        legal_code: "WSNC",
        description: "LATER PUBLICATION OF A SUPPLEMENTARY INTERNATIONAL SEARCH REPORT TOGETHER WITH A SUPPL. SEARCH REPORT ESTABLISHED BY NON-COMPETENT AUTHORITY"
    },
    {
        country_code: "WO",
        legal_code: "WWE",
        description: "WIPO INFORMATION: ENTRY INTO NATIONAL PHASE"
    },
    {
        country_code: "WO",
        legal_code: "WWG",
        description: "WIPO INFORMATION: GRANT IN NATIONAL OFFICE"
    },
    {
        country_code: "WO",
        legal_code: "WWP",
        description: "WIPO INFORMATION: PUBLISHED IN NATIONAL OFFICE"
    },
    {
        country_code: "WO",
        legal_code: "WWR",
        description: "WIPO INFORMATION: REFUSED IN NATIONAL OFFICE"
    },
    {
        country_code: "WO",
        legal_code: "WWW",
        description: "WIPO INFORMATION: WITHDRAWN IN NATIONAL OFFICE"
    },
    {
        country_code: "WO",
        legal_code: "WWX",
        description: "FORMER PCT APPLICATION EXPIRED IN NATIONAL OFFICE"
    },
    {
        country_code: "WO",
        legal_code: "X",
        description: "NO DOCUMENT PUBLISHED UNDER THIS NUMBER"
    },
    {
        country_code: "WO",
        legal_code: "XX",
        description: "MISCELLANEOUS"
    }
]




const insertData = async() => {  
    console.log(connection)
    await FamilyLegalCode.bulkCreate(legalCodeDescription, {
        ignoreDuplicates: true
    })
    
}

insertData();