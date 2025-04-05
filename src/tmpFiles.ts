import * as fs from 'fs';
import * as path from 'path';

const dir = '/tmp/mcp-exp';

export function getTmpFiles(): string[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const files = fs.readdirSync(dir).filter(file => file.endsWith('.txt'));
    return files.map(file => path.basename(file, '.txt'));
}

export function writeTmpFile(name: string, text: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, `${name}.txt`);
    fs.writeFileSync(filePath, text, 'utf8');
}
