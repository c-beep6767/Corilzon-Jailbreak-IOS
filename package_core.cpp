#include <iostream>
#include <string>
#include <vector>

struct Package {
    std::string name;
    std::string version;
    std::string type;
};

class PackageManager {
private:
    std::vector<Package> packages;

public:
    void add(const std::string& name,
             const std::string& version,
             const std::string& type) {

        packages.push_back({
            name,
            version,
            type
        });

        std::cout << "[Corilizon] Package added: "
                  << name << " "
                  << version << std::endl;
    }

    void list() const {
        if (packages.empty()) {
            std::cout << "[Corilizon] No packages."
                      << std::endl;
            return;
        }

        for (const auto& package : packages) {
            std::cout
                << package.name
                << " v" << package.version
                << " [" << package.type << "]"
                << std::endl;
        }
    }
};

int main() {
    PackageManager manager;

    manager.add("Corilizon Core", "1.0", "system");
    manager.add("Terminal", "1.0", "application");
    manager.add("Package Manager", "1.0", "system");

    std::cout << "\nInstalled packages:\n";
    manager.list();

    return 0;
}