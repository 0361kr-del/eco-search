import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createConfig} from '../public/teachers/config-builder.js';

test('teacher setup accepts only deployment URLs and makes isolated config',()=>{
  const url='https://script.google.com/macros/s/TEST-deployment_001/exec';
  const code=createConfig('  '+url+'  ');
  const ctx={};vm.createContext(ctx);vm.runInContext(code.replace('export const CONFIG','globalThis.CONFIG'),ctx);
  assert.equal(ctx.CONFIG.API_URL,url);assert.equal(ctx.CONFIG.ALLOW_FALLBACK,false);
  for(const bad of ['',url.replace('/exec','/dev'),url+'?x=1',url+'\nalert(1)',url.replace('script.google.com','evil.example'),'https://docs.google.com/spreadsheets/d/test/edit']) assert.throws(()=>createConfig(bad));
});

test('downloaded kit is reproducible, empty and independent of owner data',()=>{
  assert.match(execFileSync('python3',['tests/check-teacher-kit.py'],{encoding:'utf8'}),/isolated kit verified/);
});
