export class ReportShemaStZavezancev {
	naziv_shema: string;
    vrednost: number;
}

export class ReportProizvodStZavezancev extends ReportShemaStZavezancev {
	naziv_zascita: string;
	naziv: string;
}

export class ReportKolicine extends ReportProizvodStZavezancev {
	enota: string;
}