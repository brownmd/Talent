import { CONFIG } from "@/blog.config";

export function Footer() {
  return (
    <footer className="mt-6 px-4 md:px-0">
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {CONFIG.title}
        </span>
      </div>
    </footer>
  );
}
