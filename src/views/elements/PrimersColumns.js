export default class PrimersColumns {

    static getPrimersColumns = () => {
        const columns = [
            {
                name: "generatedName",
                label: "Generated name",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "sequence",
                label: "Sequence",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "orientation",
                label: "Orientation",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "length",
                label: "Length",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "freezer",
                label: "Freezer",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "drawer",
                label: "Drawer",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "box",
                label: "Box",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "positionInReference",
                label: "Position in the reference",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "tm",
                label: "Tm (°C)",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "optimalTOfAnnealing",
                label: "Optimal T of annealing (°C)",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "purificationMethod",
                label: "Purification method",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "amountAvailableMikroL",
                label: "Amount available (µL)",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amountAvailablePackSize",
                label: "Amount available (Pack size)",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "date",
                label: "Date",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "lengthOfAmplicone",
                label: "Length of amplicone",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "storingT",
                label: "Storing T (°C)",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "organism",
                label: "Organism",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "gen",
                label: "Gen",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "ncbiGenId",
                label: "NCBI gen ID",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "humanGenomBuild",
                label: "Human genom build",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "formulation",
                label: "Formulation",
                options: {
                    display: false,
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "typeOfPrimer",
                label: "Type of primer",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "sondaSequence",
                label: "Sonda sequence",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "assayId",
                label: "Assay ID",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "size",
                label: "Size",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "primerApplication",
                label: "Primer application",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "applicationComment",
                label: "Application comment",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "fiveModification",
                label: "5' Modification",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "threeModification",
                label: "3' Modification",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "concentrationOrdered",
                label: "Concentration ordered",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "concentrationOrderedUnit",
                label: "Concentration ordered unit",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "checkSpecifityInBlast",
                label: "Check specifity in blast",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "designerName",
                label: "Designer name",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "designerPublication",
                label: "Designer publication",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "designerDatabase",
                label: "Designer database",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "project",
                label: "Project",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "orderedBy",
                label: "Ordered by",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "supplier",
                label: "Supplier",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "manufacturer",
                label: "Manufacturer",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "comment",
                label: "Comment",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "document",
                label: "Document",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "analysis",
                label: "Analysis",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "orderStatus",
                label: "Order status",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "user",
                label: "User",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "pairs",
                label: "Pairs",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "tm",
                label: "Tm",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "gcpercent",
                label: "Gcpercent",
                options: {
                    display: false,
                    filter: true,
                    sort: true,
                }
            },
        ];

        return columns;
    }
}
