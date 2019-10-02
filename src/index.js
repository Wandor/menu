import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';
import { includes } from 'lodash';

export const decorators = {
    
    Select: (props) => {
        return (
            <div style={props.style}>
                <svg height={props.height} width={props.width}>
                    You might also like
                </svg>
            </div>
        );
    },
};
const data = {
    name: 'Menu',
    toggled: true,
    children: [
        {
            name: 'Salad',
            children: [
                { 
                    name: 'Santa Fe',
                    children: [
                        {
                            name: 'Dressing',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Blue Cheese', children: [] },
                                { name: 'Ranch', children: [] },
                            ]
                        },
                        {
                            name: 'Bread',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Flat', children: [] },
                                { name: 'Sourdough', children: [] },
                            ]
                        }
                    ] },
                { 
                    name: 'Greek' , 
                    children: [
                        {
                            name: 'Dressing',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Blue Cheese', children: [] },
                                { name: 'Ranch', children: [] },
                            ]
                        },
                        {
                            name: 'Bread',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Flat', children: [] },
                                { name: 'Sourdough', children: [] },
                            ]
                        }
                    ]
                },
                { 
                    name: 'Asian', 
                    children: [
                        {
                            name: 'Dressing',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Blue Cheese', children: [] },
                                { name: 'Ranch', children: [] },
                            ]
                        },
                        {
                            name: 'Bread',
                            children: [
                                { name: 'Italian', children: [] },
                                { name: 'Flat', children: [] },
                                { name: 'Sourdough', children: [] },
                            ]
                        }
                    ] },
            ],
            
        },
        {
            name: 'Entree',
            children: [
                { name: 'Steak' , children: []},
                { name: 'Salmon' , children: []},
                { name: 'Rice', children: [] },
            ],
            related: [
            ]
        },
        {
            name: 'Soup', 
            children: [
                { 
                    name: 'Minestrone', 
                    children: [
                        {
                            name: 'Bread', children: [
                                { name: 'Breadsticks', children: [] }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Hot and sour', 
                    children: [
                        {
                            name: 'Bread', 
                            children: [
                                { 
                                    name: 'Breadsticks', 
                                    children: [] 
                                }
                            ]
                        }
                    ] 
                },
                { 
                    name: 'Miso', 
                    children: [
                        {
                            name: 'Bread', 
                            children: [
                                { 
                                    name: 'Breadsticks', 
                                    children: [] 
                                }
                            ]
                        }
                    ] 
                },
            ],
            
        }
    ]
};


class TreeExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { data };
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onToggle(node, toggled) {
        const { cursor, data } = this.state;
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }
    onSelect(node) {
        const { cursor, data } = this.state;

        if (cursor) {
            this.setState(() => ({ cursor, active: true, related: [] }));
            if (!includes(cursor.children, node)) {
                cursor.toggled = true;
                cursor.selected = true;
            }
        }

        node.selected = true;

        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    render() {
        const { data } = this.state;
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
                onSelect={this.onSelect}
                decorators={this.decorators}
            />
        );
    }
}

const content = document.getElementById('root');
ReactDOM.render(<TreeExample />, content);