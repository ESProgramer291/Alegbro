const fs = require('fs');
const path = require('path');

console.log('🧪 Alegbro Setup Validator\n');
console.log('='.repeat(50));

const results = {
    passed: [],
    failed: [],
    warnings: [],
};

// Test 1: Check if required config files exist
console.log('\n✓ Checking configuration files...');
const configFiles = [
    'tailwind.config.js',
    'postcss.config.js',
    'package.json',
    '.stylelintrc.json',
];

configFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        results.passed.push(`${file} exists`);
        console.log(`  ✅ ${file}`);
    } else {
        results.failed.push(`${file} missing`);
        console.log(`  ❌ ${file} - MISSING`);
    }
});

// Test 2: Validate tailwind.config.js
console.log('\n✓ Validating tailwind.config.js...');
try {
    const tailwindConfig = require('./tailwind.config.js');
    if (tailwindConfig.content) {
        results.passed.push('tailwind.config.js has content array');
        console.log('  ✅ Content paths configured');
    }
    if (tailwindConfig.theme) {
        results.passed.push('tailwind.config.js has theme');
        console.log('  ✅ Theme configured');
    }
    if (tailwindConfig.plugins !== undefined) {
        results.passed.push('tailwind.config.js has plugins');
        console.log('  ✅ Plugins configured');
    }
} catch (error) {
    results.failed.push(`tailwind.config.js error: ${error.message}`);
    console.log(`  ❌ Invalid config: ${error.message}`);
}

// Test 3: Validate postcss.config.js
console.log('\n✓ Validating postcss.config.js...');
try {
    const postcssConfig = require('./postcss.config.js');
    if (postcssConfig.plugins && postcssConfig.plugins.tailwindcss) {
        results.passed.push('postcss.config.js has tailwindcss plugin');
        console.log('  ✅ Tailwind plugin registered');
    }
    if (postcssConfig.plugins && postcssConfig.plugins.autoprefixer) {
        results.passed.push('postcss.config.js has autoprefixer');
        console.log('  ✅ Autoprefixer registered');
    }
} catch (error) {
    results.failed.push(`postcss.config.js error: ${error.message}`);
    console.log(`  ❌ Invalid config: ${error.message}`);
}

// Test 4: Check CSS files for Tailwind directives
console.log('\n✓ Checking CSS files for Tailwind directives...');
const cssFiles = [
    'src/styles/globals.css',
    'src/styles/post.css',
];

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const hasTailwindBase = content.includes('@tailwind base');
        const hasTailwindComponents = content.includes('@tailwind components');
        const hasTailwindUtilities = content.includes('@tailwind utilities');

        if (hasTailwindBase && hasTailwindComponents && hasTailwindUtilities) {
            results.passed.push(`${file} has all Tailwind directives`);
            console.log(`  ✅ ${file} - All directives present`);
        } else {
            results.warnings.push(`${file} missing some Tailwind directives`);
            console.log(`  ⚠️  ${file} - Missing directives`);
            if (!hasTailwindBase) console.log('     - Missing @tailwind base');
            if (!hasTailwindComponents) console.log('     - Missing @tailwind components');
            if (!hasTailwindUtilities) console.log('     - Missing @tailwind utilities');
        }
    } else {
        results.failed.push(`${file} does not exist`);
        console.log(`  ❌ ${file} - FILE NOT FOUND`);
    }
});

// Test 5: Validate package.json dependencies
console.log('\n✓ Checking package.json dependencies...');
try {
    const packageJson = require('./package.json');
    const requiredDeps = [
        'tailwindcss',
        'postcss',
        'autoprefixer',
    ];

    requiredDeps.forEach(dep => {
        if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
            results.passed.push(`${dep} in devDependencies`);
            console.log(`  ✅ ${dep} - ${packageJson.devDependencies[dep]}`);
        } else if (packageJson.dependencies && packageJson.dependencies[dep]) {
            results.passed.push(`${dep} in dependencies`);
            console.log(`  ✅ ${dep} - ${packageJson.dependencies[dep]}`);
        } else {
            results.failed.push(`${dep} missing from package.json`);
            console.log(`  ❌ ${dep} - NOT FOUND`);
        }
    });
} catch (error) {
    results.failed.push(`package.json error: ${error.message}`);
    console.log(`  ❌ Error reading package.json: ${error.message}`);
}

// Test 6: Check for .stylelintrc.json
console.log('\n✓ Checking stylelint configuration...');
try {
    const stylelintConfig = require('./.stylelintrc.json');
    if (stylelintConfig.rules && stylelintConfig.rules['at-rule-no-unknown']) {
        const ignoreAtRules = stylelintConfig.rules['at-rule-no-unknown'][1]?.ignoreAtRules || [];
        if (ignoreAtRules.includes('tailwind') && ignoreAtRules.includes('apply')) {
            results.passed.push('.stylelintrc.json ignores Tailwind at-rules');
            console.log('  ✅ Tailwind at-rules ignored');
        } else {
            results.warnings.push('.stylelintrc.json missing some ignored at-rules');
            console.log('  ⚠️  Missing ignored at-rules configuration');
        }
    }
} catch (error) {
    results.warnings.push(`.stylelintrc.json error: ${error.message}`);
    console.log(`  ⚠️  ${error.message}`);
}

// Test 7: Validate globals.css structure
console.log('\n✓ Validating globals.css structure...');
try {
    const globalsPath = path.join(__dirname, 'src/styles/globals.css');
    const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

    const checks = {
        '@layer base': globalsContent.includes('@layer base'),
        '@layer components': globalsContent.includes('@layer components'),
        '@layer utilities': globalsContent.includes('@layer utilities'),
        '.btn class': globalsContent.includes('.btn'),
        '.card class': globalsContent.includes('.card'),
        'animations': globalsContent.includes('@keyframes'),
    };

    Object.entries(checks).forEach(([check, passes]) => {
        if (passes) {
            results.passed.push(`globals.css has ${check}`);
            console.log(`  ✅ ${check}`);
        } else {
            results.warnings.push(`globals.css missing ${check}`);
            console.log(`  ⚠️  ${check}`);
        }
    });
} catch (error) {
    results.failed.push(`globals.css validation error: ${error.message}`);
    console.log(`  ❌ ${error.message}`);
}

// Test 8: Check for duplicate class definitions
console.log('\n✓ Checking for duplicate CSS classes...');
try {
    const globalsPath = path.join(__dirname, 'src/styles/globals.css');
    const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

    const classRegex = /\.([\w-]+)\s*{/g;
    const matches = [...globalsContent.matchAll(classRegex)];
    const classes = matches.map(m => m[1]);
    const duplicates = classes.filter((item, index) => classes.indexOf(item) !== index);

    if (duplicates.length === 0) {
        results.passed.push('No duplicate CSS classes found');
        console.log('  ✅ No duplicates');
    } else {
        results.warnings.push(`Duplicate classes found: ${[...new Set(duplicates)].join(', ')}`);
        console.log(`  ⚠️  Duplicates: ${[...new Set(duplicates)].join(', ')}`);
    }
} catch (error) {
    results.warnings.push(`Duplicate check error: ${error.message}`);
    console.log(`  ⚠️  ${error.message}`);
}

// Test 9: Validate Next.js structure
console.log('\n✓ Checking Next.js structure...');
const nextFiles = [
    'src/pages',
    'src/components',
    'src/app',
];

nextFiles.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
        results.passed.push(`${dir} directory exists`);
        console.log(`  ✅ ${dir}`);
    } else {
        results.warnings.push(`${dir} directory missing`);
        console.log(`  ⚠️  ${dir} - not found`);
    }
});

// Test 10: Check environment setup
console.log('\n✓ Checking environment variables...');
const envFiles = [
    '.env.local',
    '.env.example',
];

envFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        results.passed.push(`${file} exists`);
        console.log(`  ✅ ${file}`);
    } else {
        results.warnings.push(`${file} missing`);
        console.log(`  ⚠️  ${file}`);
    }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 TEST SUMMARY\n');
console.log(`✅ Passed:  ${results.passed.length}`);
console.log(`❌ Failed:  ${results.failed.length}`);
console.log(`⚠️  Warnings: ${results.warnings.length}`);

if (results.failed.length > 0) {
    console.log('\n❌ FAILURES:');
    results.failed.forEach(f => console.log(`   - ${f}`));
}

if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.warnings.forEach(w => console.log(`   - ${w}`));
}

if (results.passed.length > 0) {
    console.log('\n✅ PASSED:');
    results.passed.slice(0, 10).forEach(p => console.log(`   - ${p}`));
    if (results.passed.length > 10) {
        console.log(`   ... and ${results.passed.length - 10} more`);
    }
}

console.log('\n' + '='.repeat(50));

// Exit with appropriate code
if (results.failed.length > 0) {
    console.log('\n🔴 SETUP INCOMPLETE - Please fix failed items above\n');
    process.exit(1);
} else if (results.warnings.length > 0) {
    console.log('\n🟡 SETUP WORKING - Please review warnings above\n');
    process.exit(0);
} else {
    console.log('\n🟢 SETUP COMPLETE - All checks passed!\n');
    process.exit(0);
}
