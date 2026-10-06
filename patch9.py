import os
import re

color_mapping = {
    '#000': 'COLORS.black',
    '#888': 'COLORS.textMuted',
    '#ffd700': 'COLORS.star',
    '#ccc': 'COLORS.grayLight',
    '#e53935': 'COLORS.errorDark',
    '#fff9e6': 'COLORS.warningBackground',
    '#ff7043': 'COLORS.orange',
    '#e0e0e0': 'COLORS.borderMedium',
    '#e8f5e9': 'COLORS.successLight',
    '#fff3e0': 'COLORS.orangeLight',
    '#2e7d32': 'COLORS.success',
    '#e65100': 'COLORS.orangeDark',
    '#f0f0f0': 'COLORS.borderDivider',
    '#444': 'COLORS.textDark',
    '#999': 'COLORS.textMuted',
    '#009688': 'COLORS.tealMedium',
    '#fbc02d': 'COLORS.starDark',
    '#c8e6c9': 'COLORS.successBorder',
    '#333': 'COLORS.text',
    '#777': 'COLORS.textMuted',
    '#00897b': 'COLORS.tealDark',
    '#ffebee': 'COLORS.errorLight',
    '#43a047': 'COLORS.successDark',
    '#1976d2': 'COLORS.info',
    '#f0f8ff': 'COLORS.infoLight',
    '#e8f3f1': 'COLORS.tealLight',
    '#1565c0': 'COLORS.infoSecondary',
    '#e3f2fd': 'COLORS.infoBackground'
}

def replace_colors_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    def repl_prop(match):
        prop_name = match.group(1)
        hex_val = match.group(2).lower()
        if hex_val in color_mapping:
            return f"{prop_name}={{ {color_mapping[hex_val]} }}"
        return match.group(0)

    # 1. Replace JSX string props: color="#888" -> color={COLORS.textMuted}
    content = re.sub(r"([a-zA-Z0-9_]+)=\"(#[A-Fa-f0-9]{3,6})\"", repl_prop, content)
    
    def repl_style(match):
        prefix = match.group(1)
        hex_val = match.group(2).lower()
        if hex_val in color_mapping:
            return f"{prefix}{color_mapping[hex_val]}"
        return match.group(0)

    # 2. Replace stylesheet string literals: backgroundColor: '#888' -> backgroundColor: COLORS.textMuted
    content = re.sub(r"([:\s\[\{\(,\+]+)'(#[A-Fa-f0-9]{3,6})'", repl_style, content)

    if content != original_content:
        # Check if COLORS is imported
        if 'COLORS' in content and 'constants/colors' not in content:
            # Add import
            depth = filepath.replace('\\\\', '/').replace('\\', '/').split('/src/')[1].count('/')
            import_path = '../' * depth + 'constants/colors'
            if depth == 0: import_path = './constants/colors'
            import_stmt = f"import {{ COLORS }} from '{import_path}';\n"
            
            # Insert after last import
            last_import = content.rfind('import ')
            if last_import != -1:
                end_of_line = content.find('\n', last_import)
                content = content[:end_of_line+1] + import_stmt + content[end_of_line+1:]
            else:
                content = import_stmt + content

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('c:/Users/Priya/Desktop/New folder/Healthcare/src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            if file == 'colors.ts': continue
            filepath = os.path.join(root, file)
            replace_colors_in_file(filepath)
