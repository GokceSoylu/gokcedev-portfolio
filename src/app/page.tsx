import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Her istekte veritabanından güncel veriyi çek

export default async function HomePage() {
    // Supabase'den öne çıkan projeleri çekiyoruz
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true);

    // Supabase'den yetenekleri çekiyoruz
    const { data: skills } = await supabase
        .from('skills')
        .select('*');

    return (
        <main className="min-h-screen p-8 max-w-5xl mx-auto space-y-12">
            {/* Hero Section */}
            <section className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Gökçe Soylu</h1>
                <p className="text-xl text-gray-400">
                    Full-Stack Software Engineer & System Architect
                </p>
            </section>

            {/* Tech Stack / Skills Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Teknoloji Matrisi</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills?.map((skill) => (
                        <div key={skill.id} className="p-4 rounded-lg border bg-card text-card-foreground">
                            <p className="font-medium">{skill.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{skill.category}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Öne Çıkan Projeler</h2>
                <div className="grid gap-6">
                    {projects?.map((project) => (
                        <div key={project.id} className="p-6 rounded-xl border space-y-3">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-gray-300">{project.description}</p>
                            <p className="text-sm text-gray-400"><strong>Mimari:</strong> {project.architecture_details}</p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.technologies?.map((tech: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}