const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取当前工作目录下的所有子包路径
const getPackagesPaths = () => {
  const packagesDir = path.join(process.cwd(), 'packages');
  return fs.readdirSync(packagesDir)
    .filter(file => fs.statSync(path.join(packagesDir, file)).isDirectory())
    .map(dir => path.join(packagesDir, dir));
};

// 安装公共包到每个子包
const installCommonPackage = (packageName) => {
  const packagesPaths = getPackagesPaths();
  packagesPaths.forEach(packagePath => {
    console.log(`Installing ${packageName} in ${packagePath}`);
    execSync(`npm install ${packageName}`, { cwd: packagePath, stdio: 'inherit' });
  });
};

// 执行安装
installCommonPackage('bootstrap');