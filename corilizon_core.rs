#[derive(Debug)]
struct Component {
    name: String,
    version: String,
}

fn main() {
    let component = Component {
        name: String::from("Corilizon Core"),
        version: String::from("1.0"),
    };

    println!("[Corilizon Rust Core]");
    println!("Component: {}", component.name);
    println!("Version: {}", component.version);
    println!("Mode: simulation");
}