export type Project = {
    id: number
    name: string
    description: string
    project_id: string
    company_name: string
    number_of_employees: number
    start_date: string
    end_date: string
}

export type ProjectPageData = {
    projects: Project[]
}
