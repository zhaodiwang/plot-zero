const json = 'https://raw.githubusercontent.com/zhaodiwang/sensing-the-landscape/main/data.json';
console.log('chart1')
const json2 = 'https://raw.githubusercontent.com/zhaodiwang/sensing-the-landscape/main/data.json';

function changeGraph(graphType) {
    Plotly.d3.json(json, function(err, figs) {
        // 1,2,...,70
        // temperature, co2, humidity, solar_radiation
        function unpack(data, time) {
            return data[time];
        }

        var button_layer_1_height = 1.2
        var button_layer_2_height = 1.05
        var annotation_offset = 0.04

        var data = []

        var data_temp = [{
            type: 'surface',
            colorscale: 'YlGnBu',
            z: figs[1]['temperature'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_co2 = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(165,0,38)'],
                ['0.111111111111', 'rgb(215,48,39)'],
                ['0.222222222222', 'rgb(244,109,67)'],
                ['0.333333333333', 'rgb(253,174,97)'],
                ['0.444444444444', 'rgb(254,224,144)'],
                ['0.555555555556', 'rgb(224,243,248)'],
                ['0.666666666667', 'rgb(171,217,233)'],
                ['0.777777777778', 'rgb(116,173,209)'],
                ['0.888888888889', 'rgb(69,117,180)'],
                ['1.0', 'rgb(49,54,149)']
            ],
            z: figs[1]['co2'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_humi = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(255,255,255)'],
                ['0.5', 'rgb(94,102,172)'],
                ['1.0', 'rgb(29,106,224)']
            ],
            z: figs[1]['humidity'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_solar = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(255,235,124)'],
                ['0.5', 'rgb(255,139,45)'],
                ['1.0', 'rgb(255,109,63)']
            ],
            z: figs[1]['solar_radiation'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }];

        var frames = []
        var frames_temp = []
        var frames_co2 = []
        var frames_humi = []
        var frames_solar = []

        var slider_steps = []
        var slider_steps_temp = []
        var slider_steps_co2 = []
        var slider_steps_humi = []
        var slider_steps_solar = []

        var n = 70;
        var num = 1;
        for (var i = 0; i < n; i++) {
            var z = unpack(figs, num);
            frames_temp[i] = {
                data: [{
                    z: z['temperature']
                }],
                name: num.toString() + 'temperature'
            }
            frames_co2[i] = {
                data: [{
                    z: z['co2']
                }],
                name: num.toString() + 'co2'
            }
            frames_humi[i] = {
                data: [{
                    z: z['humidity']
                }],
                name: num.toString() + 'humidity'
            }
            frames_solar[i] = {
                data: [{
                    z: z['solar_radiation']
                }],
                name: num.toString() + 'solar_radiation'
            }
            slider_steps_temp.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'temperature'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_co2.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'co2'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_humi.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'humidity'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_solar.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'solar_radiation'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            num++
        }
        frames.push.apply(frames, frames_temp);
        frames.push.apply(frames, frames_co2);
        frames.push.apply(frames, frames_humi);
        frames.push.apply(frames, frames_solar);

        switch (graphType) {
            case 0:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
                break;
            case 1:
                data = data_co2
                frames = frames_co2;
                slider_steps = slider_steps_co2;
                break;
            case 2:
                data = data_humi;
                frames = frames_humi;
                slider_steps = slider_steps_humi;
                break;
            case 3:
                data = data_solar;
                frames = frames_solar;
                slider_steps = slider_steps_solar;
                break;

            default:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
        }



        //layout
        var updatemenus = [{
            buttons: [{
                args: ['type', 'surface'],
                label: '3D Surface',
                method: 'restyle'
            },
                {
                    args: [{
                        'contours.showlines': false,
                        'type': 'contour'
                    }],
                    label: 'Contour',
                    method: 'restyle'
                },
                {
                    args: ['type', 'heatmap'],
                    label: 'Heatmap',
                    method: 'restyle'
                },
            ],
            direction: 'left',
            pad: {
                'r': 10,
                // 't': 10
            },
            showactive: false,
            type: 'buttons',
            x: 0.15,
            xanchor: 'left',
            y: button_layer_1_height,
            yanchor: 'top',
            font: {
                color: '#cacaca'
            }
        },
            {
                buttons: [{
                    method: "animate",
                    args: [null, {
                        fromcurrent: true,
                        transition: {
                            duration: 200,
                        },
                        frame: {
                            duration: 500
                        }
                    }],
                    label: "Play"
                },
                    {
                        method: "animate",
                        args: [
                            [null],
                            {
                                mode: "immediate",
                                transition: {
                                    duration: 0
                                },
                                frame: {
                                    duration: 0
                                }
                            }
                        ],
                        label: "Pause"
                    }
                ],
                direction: 'down',
                pad: {
                    t: 370,
                    r: -10,
                    l: 0
                },
                showactive: true,
                type: 'buttons',
                xanchor: 'left',
                yanchor: 'top',
                font: {
                    color: '#cacaca'
                }
            }]

        var annotations = [{
            text: 'Trace type:',
            x:-0.01,
            y: 1.17,
            yref: 'paper',
            align: 'left',
            showarrow: false,
            font: {
                family: 'Roboto, monospace',
                size: 12,
                color: '#a0a0a0'
            }
        },]

        var layout = {
            // title: 'Indexical Surface at Plot-Zero',
            scene: {
                camera: {
                    eye: {
                        x: 1.2,
                        y: 0.88,
                        z: -0.64
                    }
                },
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 0.7
                },
                aspectmode: 'manual'
            },
            autosize: true,
            width: 600,
            height: 550,
            margin: {
                l: 65,
                r: 50,
                b: 65,
                t: 100
            },
            font: {
                family: 'Roboto, monospace',
                size: 12,
                color: '#ffffff'
            },
            updatemenus: updatemenus,
            annotations: annotations,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            legend: {
                xanchor: "center",
                yanchor: "top",
                y: 3, // play with it
                x: 0, // play with it
                orientation: 'right'
            },
            sliders: [{
                active: 0,
                steps: slider_steps,
                x: 0.1,
                len: 0.9,
                xanchor: "left",
                y: 0,
                yanchor: "top",
                pad: {
                    l: 10,
                    t: 10,
                    l: 10
                },
                currentvalue: {
                    visible: true,
                    prefix: "Timestamp (10/day) : ",
                    xanchor: "right",
                    size: 5,
                    font: {
                        color: '#bcbcbc'
                    }
                },
                transition: {
                    duration: 300,
                    easing: "cubic-in-out"
                }
            }]

        };

        var config = {responsive: true}
        //
        // console.log(frames)

        Plotly.newPlot(document.getElementById('myDiv1'), data, layout,config).then(function() {
            Plotly.addFrames('myDiv1', frames);
        });


    })
}
function changeGraph2(graphType) {
    Plotly.d3.json(json2, function(err, figs){
        // 1,2,...,70
        // temperature, co2, humidity, solar_radiation
        function unpack2(data, time) {
            return data[time];
        }

        var button_layer_1_height =1.2
        var button_layer_2_height = 1.05
        var annotation_offset = 0.04

        var data = []
        var data_temp = [{
            type: 'heatmap',
            opacity: 0.95,
            colorscale: [
                ['0.0', '#1f1f1f'],
                ['0.4', '#1f1f1f'],
                ['0.41', '#bee596'],
                ['0.5', '#95e274'],
                ['0.6', '#62ac57'],
                ['0.8', '#1f1f1f'],
                ['1.0', '#1f1f1f'],
            ],
            z: figs[1]['temperature'],
            // zmin: 0.6,
            // zmax: 0.8,
            contours: {
                z: {
                    show:true,
                    usecolormap: true,
                    highlightcolor:"#42f462",
                    project:{z: true}
                }
            }
        }]
        var data_co2 = [{
            type: 'heatmap',
            opacity: 0.95,
            colorscale: [
                ['0.0', '#1f1f1f'],
                ['0.3', '#1f1f1f'],
                ['0.31', 'rgb(253,174,97)'],
                ['0.5', 'rgb(244,109,67)'],
                ['0.7', 'rgb(215,48,39)'],
                ['0.8', '#1f1f1f'],
                ['1.0', '#1f1f1f'],
            ],
            z: figs[1]['co2'],
            // zmin: 0.6,
            // zmax: 0.8,
            contours: {
                z: {
                    show:true,
                    usecolormap: true,
                    highlightcolor:"#42f462",
                    project:{z: true}
                }
            }
        }]
        var data_humi = [{
            type: 'heatmap',
            opacity: 0.95,
            colorscale: [
                ['0.0', '#1f1f1f'],
                ['0.4', '#1f1f1f'],
                ['0.41', '#96c0e5'],
                ['0.5', '#748ce2'],
                ['0.6', '#324ed7'],
                ['0.8', '#1f1f1f'],
                ['1.0', '#1f1f1f'],
                // ['0.0', 'rgb(255,255,255)'],
                // ['0.5', 'rgb(94,102,172)'],
                // ['1.0', 'rgb(29,106,224)']
            ],
            z: figs[1]['humidity'],
            contours: {
                z: {
                    show:true,
                    usecolormap: true,
                    highlightcolor:"#42f462",
                    project:{z: true}
                }
            }
        }]
        var data_solar = [{
            type: 'heatmap',
            opacity: 0.9,
            colorscale: [
                ['0.0', '#1f1f1f'],
                ['0.4', '#1f1f1f'],
                ['0.41', '#fffa85'],
                ['0.5', '#daee68'],
                ['0.6', '#a3cf4b'],
                ['0.8', '#1f1f1f'],
                ['1.0', '#1f1f1f'],
            ],
            z: figs[1]['solar_radiation'],
            // zmin: 0.6,
            // zmax: 0.8,
            contours: {
                z: {
                    show:true,
                    usecolormap: true,
                    highlightcolor:"#42f462",
                    project:{z: true}
                }
            }
        }
        ];


        var frames = []
        var frames_temp = []
        var frames_co2 = []
        var frames_humi = []
        var frames_solar = []

        var slider_steps = []
        var slider_steps_temp = []
        var slider_steps_co2 = []
        var slider_steps_humi = []
        var slider_steps_solar = []

        var n = 70;
        var num = 1;
        for (var i = 0; i < n; i++) {
            var z = unpack2(figs,num);
            frames_temp[i] = {data: [{z: z['temperature']}], name: num.toString()+'temperature'}
            frames_co2[i] = {data: [{z: z['co2']}], name: num.toString()+'co2'}
            frames_humi[i] = {data: [{z: z['humidity']}], name: num.toString()+'humidity'}
            frames_solar[i] = {data: [{z: z['solar_radiation']}], name: num.toString()+'solar_radiation'}
            slider_steps_temp.push ({
                label: num.toString(),
                method: "animate",
                args: [[num.toString()+'temperature'], {
                    mode: "immediate",
                    transition: {duration: 300},
                    frame: {duration: 500}
                }
                ]
            })
            slider_steps_co2.push ({
                label: num.toString(),
                method: "animate",
                args: [[num.toString()+'co2'], {
                    mode: "immediate",
                    transition: {duration: 300},
                    frame: {duration: 500}
                }
                ]
            })
            slider_steps_humi.push ({
                label: num.toString(),
                method: "animate",
                args: [[num.toString()+'humidity'], {
                    mode: "immediate",
                    transition: {duration: 300},
                    frame: {duration: 500}
                }
                ]
            })
            slider_steps_solar.push ({
                label: num.toString(),
                method: "animate",
                args: [[num.toString()+'solar_radiation'], {
                    mode: "immediate",
                    transition: {duration: 300},
                    frame: {duration: 500}
                }
                ]
            })
            num++
        }
        frames.push.apply(frames, frames_temp);
        frames.push.apply(frames, frames_co2);
        frames.push.apply(frames, frames_humi);
        frames.push.apply(frames, frames_solar);

        switch (graphType) {
            case 0:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
                break;
            case 1:
                data = data_co2
                frames = frames_co2;
                slider_steps = slider_steps_co2;
                break;
            case 2:
                data = data_humi;
                frames = frames_humi;
                slider_steps = slider_steps_humi;
                break;
            case 3:
                data = data_solar;
                frames = frames_solar;
                slider_steps = slider_steps_solar;
                break;
            default:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
        }
        //layout
        var updatemenus=[
            {
                buttons:[
                    {
                        args: ['type', 'heatmap'],
                        label: 'Heatmap',
                        method: 'restyle'
                    },
                    {
                        args: [{'contours.showlines': false, 'type': 'contour'}],
                        label: 'Contour',
                        method: 'restyle'
                    },
                ],
                direction: 'left',
                pad: {'r': 10, 't': 10},
                showactive: false,
                type: 'buttons',
                x: 0.15,
                xanchor: 'left',
                y: button_layer_1_height,
                yanchor: 'top',
                font: {color: '#cacaca'}
            },
        ]

        var annotations = [
            {
                text: 'Trace type:',
                x: -2,
                y:1.15,
                // y: button_layer_1_height - annotation_offset, //1.15
                yref: 'paper',
                // align: 'right',
                showarrow: false,
                font:{
                    family: 'Roboto, monospace',
                    size: 12,
                    color: '#a0a0a0'
                }
            },
        ]

        var layout = {
            scene: {
                camera: {eye: {x: 1.2, y: 0.88, z: -0.64}},
                aspectratio: {x: 1, y: 1, z: 0.7},
                aspectmode: 'manual'
            },
            autosize: true,
            width: 600,
            height: 550,
            margin: {l: 65, r: 50, b: 65, t: 100},
            font: {
                family: 'Roboto, monospace',
                size: 12,
                color: '#ffffff'
            },
            updatemenus: updatemenus,
            annotations: annotations,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            legend:{
                xanchor:"center",
                yanchor:"top",
                y:3, // play with it
                x:1,  // play with it
                orientation: 'right'
            },
        };

        Plotly.newPlot('myDiv2', data, layout)
    })
}
function changeGraph3(graphType) {
    Plotly.d3.json(json, function(err, figs) {
        // 1,2,...,70
        // temperature, co2, humidity, solar_radiation
        function unpack(data, time) {
            return data[time];
        }

        var button_layer_1_height = 1.2
        var button_layer_2_height = 1.05
        var annotation_offset = 0.04

        var data = []

        var data_temp = [{
            type: 'surface',
            colorscale: 'YlGnBu',
            z: figs[1]['temperature'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_co2 = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(165,0,38)'],
                ['0.111111111111', 'rgb(215,48,39)'],
                ['0.222222222222', 'rgb(244,109,67)'],
                ['0.333333333333', 'rgb(253,174,97)'],
                ['0.444444444444', 'rgb(254,224,144)'],
                ['0.555555555556', 'rgb(224,243,248)'],
                ['0.666666666667', 'rgb(171,217,233)'],
                ['0.777777777778', 'rgb(116,173,209)'],
                ['0.888888888889', 'rgb(69,117,180)'],
                ['1.0', 'rgb(49,54,149)']
            ],
            z: figs[1]['co2'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_humi = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(255,255,255)'],
                ['0.5', 'rgb(94,102,172)'],
                ['1.0', 'rgb(29,106,224)']
            ],
            z: figs[1]['humidity'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }]
        var data_solar = [{
            type: 'surface',
            colorscale: [
                ['0.0', 'rgb(255,235,124)'],
                ['0.5', 'rgb(255,139,45)'],
                ['1.0', 'rgb(255,109,63)']
            ],
            z: figs[1]['solar_radiation'],
            contours: {
                z: {
                    show: true,
                    usecolormap: true,
                    highlightcolor: "#42f462",
                    project: {
                        z: true
                    }
                }
            }
        }];

        var frames = []
        var frames_temp = []
        var frames_co2 = []
        var frames_humi = []
        var frames_solar = []

        var slider_steps = []
        var slider_steps_temp = []
        var slider_steps_co2 = []
        var slider_steps_humi = []
        var slider_steps_solar = []

        var n = 70;
        var num = 1;
        for (var i = 0; i < n; i++) {
            var z = unpack(figs, num);
            frames_temp[i] = {
                data: [{
                    z: z['temperature']
                }],
                name: num.toString() + 'temperature'
            }
            frames_co2[i] = {
                data: [{
                    z: z['co2']
                }],
                name: num.toString() + 'co2'
            }
            frames_humi[i] = {
                data: [{
                    z: z['humidity']
                }],
                name: num.toString() + 'humidity'
            }
            frames_solar[i] = {
                data: [{
                    z: z['solar_radiation']
                }],
                name: num.toString() + 'solar_radiation'
            }
            slider_steps_temp.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'temperature'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_co2.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'co2'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_humi.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'humidity'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            slider_steps_solar.push({
                label: num.toString(),
                method: "animate",
                args: [
                    [num.toString() + 'solar_radiation'], {
                        mode: "immediate",
                        transition: {
                            duration: 300
                        },
                        frame: {
                            duration: 500
                        }
                    }
                ]
            })
            num++
        }
        frames.push.apply(frames, frames_temp);
        frames.push.apply(frames, frames_co2);
        frames.push.apply(frames, frames_humi);
        frames.push.apply(frames, frames_solar);

        switch (graphType) {
            case 0:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
                break;
            case 1:
                data = data_co2
                frames = frames_co2;
                slider_steps = slider_steps_co2;
                break;
            case 2:
                data = data_humi;
                frames = frames_humi;
                slider_steps = slider_steps_humi;
                break;
            case 3:
                data = data_solar;
                frames = frames_solar;
                slider_steps = slider_steps_solar;
                break;

            default:
                data = data_temp;
                frames = frames_temp;
                slider_steps = slider_steps_temp;
        }

        //layout
        var updatemenus = [{
            buttons: [{
                args: ['type', 'surface'],
                label: '3D Surface',
                method: 'restyle'
            },
                {
                    args: [{
                        'contours.showlines': false,
                        'type': 'contour'
                    }],
                    label: 'Contour',
                    method: 'restyle'
                },
                {
                    args: ['type', 'heatmap'],
                    label: 'Heatmap',
                    method: 'restyle'
                },
            ],
            direction: 'left',
            pad: {
                'r': 10,
                // 't': 10
            },
            showactive: false,
            type: 'buttons',
            x: 0.15,
            xanchor: 'left',
            y: button_layer_1_height,
            yanchor: 'top',
            font: {
                color: '#cacaca'
            }
        }]

        var annotations = [{
            text: 'Trace type:',
            x:-0.01,
            y: 1.17,
            yref: 'paper',
            align: 'left',
            showarrow: false,
            font: {
                family: 'Roboto, monospace',
                size: 12,
                color: '#a0a0a0'
            }
        },]

        var layout = {
            // title: 'Indexical Surface at Plot-Zero',
            scene: {
                camera: {
                    eye: {
                        x: 1.2,
                        y: 0.88,
                        z: -0.64
                    }
                },
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 0.7
                },
                aspectmode: 'manual'
            },
            autosize: true,
            width: 600,
            height: 550,
            margin: {
                l: 65,
                r: 50,
                b: 65,
                t: 100
            },
            font: {
                family: 'Roboto, monospace',
                size: 12,
                color: '#ffffff'
            },
            updatemenus: updatemenus,
            annotations: annotations,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            legend: {
                xanchor: "center",
                yanchor: "top",
                y: 3, // play with it
                x: 0, // play with it
                orientation: 'right'
            },
        };

        var config = {responsive: true}

        // console.log(frames)
        Plotly.newPlot(document.getElementById('myDiv1'), data, layout,config);
    })
}

function Myfunction(){
    document.getElementById("checkbox").addEventListener("click", function() {
        var status = document.getElementById("checkbox").checked
        if (status == true) {
            document.getElementById("btn0").addEventListener("click", function() {
                changeGraph3(0);
            });
            document.getElementById("btn1").addEventListener("click", function() {
                changeGraph3(1);
            });
            document.getElementById("btn2").addEventListener("click", function() {
                changeGraph3(2);
            });
            document.getElementById("btn3").addEventListener("click", function() {
                changeGraph3(3);
            });
            console.log('checked')}
        else{
            document.getElementById("btn0").addEventListener("click", function() {
                changeGraph(0);
            });
            document.getElementById("btn1").addEventListener("click", function() {
                changeGraph(1);
            });
            document.getElementById("btn2").addEventListener("click", function() {
                changeGraph(2);
            });
            document.getElementById("btn3").addEventListener("click", function() {
                changeGraph(3);
            });
        }
    }
)};

window.onload = function() {
            document.getElementById("btn0").addEventListener("click", function() {
                changeGraph(0);
            });
            document.getElementById("btn1").addEventListener("click", function() {
                changeGraph(1);
            });
            document.getElementById("btn2").addEventListener("click", function() {
                changeGraph(2);
            });
            document.getElementById("btn3").addEventListener("click", function() {
                changeGraph(3);
            });

    document.getElementById("button00").addEventListener("click", function () {
        changeGraph2(0);
    });
    document.getElementById("button01").addEventListener("click", function () {
        changeGraph2(1);
    });
    document.getElementById("button02").addEventListener("click", function () {
        changeGraph2(2);
    });
    document.getElementById("button03").addEventListener("click", function () {
        changeGraph2(3);
    });
    document.getElementById("button04").addEventListener("click", function () {
        changeGraph2(1);
    });

    document.getElementById("btn0").click();
    document.getElementById("button00").click();
}