'use strict';

const vis = require('vis');
const uuid = require('uuid/v4');
console.log('script start');
const visNodes = new vis.DataSet();
const visEdges = new vis.DataSet();
const elems = [];
const root = document.getElementsByTagName('body')[0];
const rootId = uuid();
elems.push({id: rootId, elem: root});

const traverse = (parentId, parentNode) => {
    Array.from(parentNode.children).forEach(node => {
        const childId = uuid();
        visNodes.add({id: childId, label: createLabel(node)});
        visEdges.add({from: parentId, to: childId});
        elems.push({id: childId, elem: node});
    });
}

const createLabel = (elem) => {
    const values = [];
    if (elem.id !== undefined && elem.id !== ''){
        values.push(`id: ${elem.id}`);
    }
    if (elem.className !== undefined && elem.className !== '') {
        values.push(`class: ${elem.className}`);
    }
    if (elem.tagName !== undefined && elem.tagName !== '') {
        values.push(`tag: ${elem.tagName}`);
    }
    return values.join(', ');
}

// visNodes.add({id: rootId, label: `id: ${root.id}, class: ${root.className}, tag: ${root.tagName}`, color: 'red', x: 0});
visNodes.add({id: rootId, label: createLabel(root), color: 'red', x: 0});
while (elems.length > 0) {
    let top = elems.shift();
    traverse(top.id, top.elem);
}
console.log(visNodes);
console.log(visEdges);
console.log('test');

// create a network
var container = document.createElement('div');
container.id = 'graph';
body.appendChild(container);

// provide the data in the vis format
var data = {
    nodes: visNodes,
    edges: visEdges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);
