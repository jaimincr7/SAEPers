export namespace Interfaces{
    export interface IRaceLog{
        id: string,
        name: string,
        date: string,
        duration: number,
        bucketKey: string
    }

    export interface ISubsystem{
        subsystem: string,
        key: string
    }

    export interface IAnalysisJSON{
        subsystem: string,
        mainLabel: string,
        data: {
            id: string,
            horizontalLabel: string,
            value: number

        }[]
    }

    export interface IChart {
        labels: string[];
        datasets: {
            subsystem: string,
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string,
            borderWidth: number
        }[];

      }

    
    
}